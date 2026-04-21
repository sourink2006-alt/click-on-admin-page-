"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerActions?: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  className = '',
  headerActions,
}) => {
  return (
    <div className={cn(
      'bg-card border border-border rounded-xl shadow-sm overflow-hidden',
      className
    )}>
      {(title || headerActions) && (
        <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
          {title && (
            <h3 className="text-[13px] font-semibold text-foreground tracking-tight">{title}</h3>
          )}
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};
