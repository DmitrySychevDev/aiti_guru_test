import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from '@/shared/ui/Input';

export function ProductSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('q') ?? '');

  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    setValue(q);
  }, [searchParams]);

  const handleSearch = useCallback(
    (searchValue: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (searchValue) {
          next.set('q', searchValue);
        } else {
          next.delete('q');
        }
        next.set('page', '1');
        return next;
      });
    },
    [setSearchParams],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentQ = searchParams.get('q') ?? '';
      if (value !== currentQ) {
        handleSearch(value);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [value, handleSearch, searchParams]);

  return (
    <Input
      prefix={<SearchOutlined style={{ color: '#999999' }} />}
      placeholder="Найти"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      allowClear
      style={{
        maxWidth: 1023,
        width: '100%',
        height: 48,
        background: '#F3F3F3',
        borderRadius: 8,
        border: 'none',
        fontSize: 14,
      }}
    />
  );
}
