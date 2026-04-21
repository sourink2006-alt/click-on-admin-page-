"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
  headerClassName?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  rowClassName?: (item: T) => string;
  className?: string;
}

export function Table<T extends object>({
  columns,
  data,
  onRowClick,
  rowClassName,
  className = '',
}: TableProps<T>) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/30">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={cn(
                  'text-left text-[10px] font-medium text-muted-foreground uppercase tracking-widest px-4 py-3 border-b border-border first:pl-0 last:pr-0',
                  col.headerClassName
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {data.map((item, rowIdx) => (
            <tr
              key={(item as any).id ?? rowIdx}
              onClick={() => onRowClick?.(item)}
              className={cn(
                'transition-colors duration-100 hover:bg-muted/20',
                onRowClick ? 'cursor-pointer' : 'cursor-default',
                rowClassName?.(item)
              )}
            >
              {columns.map((col, colIdx) => (
                <td
                  key={colIdx}
                  className={cn(
                    'px-4 py-3.5 text-[13px] text-muted-foreground first:pl-0 last:pr-0',
                    col.className
                  )}
                >
                  {typeof col.accessor === 'function'
                    ? col.accessor(item)
                    : (item[col.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
