import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  GlobalOutlined,
  BellOutlined,
  MailOutlined,
  ControlOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Badge } from 'antd';
import { Button } from '@/shared/ui/Button';
import { IconButton } from '@/shared/ui/IconButton';
import { RefreshIcon } from '@/shared/ui/icons/RefreshIcon';
import { ProductSearch } from '@/features/products/search';
import { ProductsTable } from '@/widgets/products-table';
import { AddProductModal } from '@/widgets/add-product-modal';
import styles from './ProductsPage.module.scss';

export function ProductsPage() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
  }, [queryClient]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Товары</h1>

        <div className={styles.searchWrapper}>
          <ProductSearch />
        </div>

        <div className={styles.headerActions}>
          <Button type="text" icon={<GlobalOutlined />} />
          <Badge count={12} size="small">
            <Button type="text" icon={<BellOutlined />} />
          </Badge>
          <Button type="text" icon={<MailOutlined />} />
          <Button type="text" icon={<ControlOutlined />} />
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.toolbar}>
          <h2 className={styles.sectionTitle}>Все позиции</h2>
          <div className={styles.toolbarActions}>
            <IconButton
              icon={<RefreshIcon />}
              onClick={handleRefresh}
            />
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              className={styles.addBtn}
              onClick={() => setAddModalOpen(true)}
            >
              Добавить
            </Button>
          </div>
        </div>

        <ProductsTable onRefresh={handleRefresh} />
      </div>

      <AddProductModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
    </div>
  );
}
