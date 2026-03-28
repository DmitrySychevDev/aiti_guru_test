import { useSearchParams } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Progress } from 'antd';
import { Table } from '@/shared/ui/Table';
import { Button } from '@/shared/ui/Button';
import { productApi, ProductRating } from '@/entities/product';
import type { Product } from '@/entities/product';
import { PRODUCTS_PER_PAGE } from '@/shared/config/constants';
import type { TableProps } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import styles from './ProductsTable.module.scss';

interface ProductsTableProps {
  onRefresh?: () => void;
}

export function ProductsTable({ onRefresh }: ProductsTableProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? '1');
  const sortBy = searchParams.get('sortBy') ?? undefined;
  const order = (searchParams.get('order') as 'asc' | 'desc') ?? undefined;
  const search = searchParams.get('q') ?? undefined;

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['products', { page, sortBy, order, search }],
    queryFn: () =>
      productApi.getProducts({
        page,
        limit: PRODUCTS_PER_PAGE,
        sortBy,
        order,
        search,
      }),
    placeholderData: keepPreviousData,
  });

  const handleTableChange: TableProps<Product>['onChange'] = (_pagination, _filters, sorter) => {
    const s = sorter as SorterResult<Product>;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (s.order) {
        next.set('sortBy', s.field as string);
        next.set('order', s.order === 'ascend' ? 'asc' : 'desc');
      } else {
        next.delete('sortBy');
        next.delete('order');
      }
      next.set('page', '1');
      return next;
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(newPage));
      return next;
    });
  };

  const handleRefresh = () => {
    refetch();
    onRefresh?.();
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getSortOrder = (field: string) => {
    if (sortBy !== field) return undefined;
    return order === 'asc' ? ('ascend' as const) : ('descend' as const);
  };

  const columns: TableProps<Product>['columns'] = [
    {
      title: 'Наименование',
      key: 'title',
      width: 278,
      render: (_: unknown, record: Product) => (
        <div className={styles.nameCell}>
          <img
            src={record.thumbnail}
            alt={record.title}
            className={styles.thumbnail}
          />
          <div>
            <div className={styles.productName}>{record.title}</div>
            <div className={styles.productCategory}>{record.category}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Вендор',
      dataIndex: 'brand',
      key: 'brand',
      width: 125,
      render: (brand: string) => (
        <span className={styles.vendorCell}>{brand ?? '—'}</span>
      ),
    },
    {
      title: 'Артикул',
      dataIndex: 'sku',
      key: 'sku',
      width: 160,
      render: (sku: string) => (
        <span className={styles.skuCell}>{sku}</span>
      ),
    },
    {
      title: 'Оценка',
      dataIndex: 'rating',
      key: 'rating',
      width: 125,
      sorter: true,
      sortOrder: getSortOrder('rating'),
      render: (rating: number) => (
        <span className={styles.ratingCell}>
          <ProductRating rating={rating} />
        </span>
      ),
    },
    {
      title: 'Цена, ₽',
      dataIndex: 'price',
      key: 'price',
      width: 160,
      sorter: true,
      sortOrder: getSortOrder('price'),
      render: (price: number) => (
        <span className={styles.priceCell}>{formatPrice(price)}</span>
      ),
    },
    {
      title: 'Количество',
      dataIndex: 'stock',
      key: 'stock',
      width: 110,
      render: (stock: number) => (
        <div className={styles.stockBar}>
          <Progress
            percent={Math.min(stock, 100)}
            showInfo={false}
            size="small"
            strokeColor="#1a1a2e"
            steps={5}
          />
        </div>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 133,
      render: () => (
        <div className={styles.rowActions}>
          <button type="button" className={styles.plusBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button type="button" className={styles.dotsBtn}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" stroke="#B2B3B9" strokeWidth="1.5" fill="none" />
              <circle cx="10" cy="16" r="1.5" fill="#B2B3B9" />
              <circle cx="16" cy="16" r="1.5" fill="#B2B3B9" />
              <circle cx="22" cy="16" r="1.5" fill="#B2B3B9" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const total = data?.total ?? 0;
  const from = (page - 1) * PRODUCTS_PER_PAGE + 1;
  const to = Math.min(page * PRODUCTS_PER_PAGE, total);

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.progressBar}>
          <Progress percent={100} status="active" showInfo={false} size="small" />
        </div>
      )}

      <div className={styles.tableWrapper}>
        <Table<Product>
          columns={columns}
          dataSource={data?.products}
          rowKey="id"
          loading={isFetching}
          pagination={false}
          onChange={handleTableChange}
          rowSelection={{ type: 'checkbox' }}
          scroll={{ x: 900, y: 'calc(100vh - 430px)' }}
        />
      </div>

      <div className={styles.footer}>
        <span className={styles.showing}>
          Показано {from}-{to} из {total}
        </span>
        <div className={styles.pagination}>
          <Button
            size="small"
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            &lt;
          </Button>
          {Array.from({ length: Math.min(5, Math.ceil(total / PRODUCTS_PER_PAGE)) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <Button
                key={pageNum}
                size="small"
                type={pageNum === page ? 'primary' : 'default'}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}
          <Button
            size="small"
            disabled={page >= Math.ceil(total / PRODUCTS_PER_PAGE)}
            onClick={() => handlePageChange(page + 1)}
          >
            &gt;
          </Button>
        </div>
      </div>

    </div>
  );
}
