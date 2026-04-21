"use client";

import React from 'react';
import { Box, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';
import { HandoverBatch } from '@/lib/mockData';
import { StatusPill } from './StatusPill';
import { cn } from '@/lib/utils';

interface BatchSummaryCardProps {
  batch: HandoverBatch;
  isActive: boolean;
  onClick: () => void;
}

export const BatchSummaryCard: React.FC<BatchSummaryCardProps> = ({ batch, isActive, onClick }) => {
  const progress = Math.round((batch.processedItems / batch.totalItems) * 100);
  const isDone = batch.status === 'completed';

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left p-4 rounded-xl border transition-all duration-150 group',
        isActive
          ? 'bg-primary/5 border-primary/30 shadow-sm dark:bg-primary/10 dark:border-primary/40'
          : 'bg-card border-border hover:border-border hover:bg-muted/30'
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className={cn(
          'p-2 rounded-lg transition-colors',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground border border-border'
        )}>
          <Box className="w-4 h-4" />
        </div>
        <StatusPill status={batch.status} />
      </div>

      <div className="space-y-0.5 mb-3">
        <p className={cn(
          'text-[10px] font-semibold uppercase tracking-widest',
          isActive ? 'text-primary' : 'text-muted-foreground'
        )}>
          {batch.id}
        </p>
        <h4 className="text-[14px] font-semibold text-foreground">{batch.origin}</h4>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span className="text-[10px] font-medium">{batch.processedItems}/{batch.totalItems} items</span>
          </div>
          <span className={cn(
            'text-[11px] font-semibold',
            isActive ? 'text-primary' : 'text-muted-foreground'
          )}>{progress}%</span>
        </div>

        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full transition-all duration-500 rounded-full',
              isDone ? 'bg-emerald-500' : 'bg-primary'
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-opacity">
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </button>
  );
};
