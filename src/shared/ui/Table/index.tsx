import { Table as AntTable } from 'antd';
import type { TableProps as AntTableProps } from 'antd';

export type TableProps<T extends object> = AntTableProps<T>;
export const Table = AntTable;
