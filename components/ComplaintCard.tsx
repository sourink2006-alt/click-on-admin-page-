"use client";

import React from 'react';
import { Star, AlertTriangle } from 'lucide-react';
import { Complaint } from '@/lib/mockData';
import { StatusPill } from './StatusPill';
import { cn } from '@/lib/utils';

interface ComplaintCardProps {
  complaint: Complaint;
}

export const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint }) => {
  return (
    <div className={cn(
      'p-4 rounded-xl border transition-all',
      complaint.isCritical
        ? 'bg-rose-50/40 border-rose-200 dark:bg-rose-900/10 dark:border-rose-900/30'
        : 'bg-card border-border hover:bg-muted/20'
    )}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground border border-border shrink-0">
            IMG
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-semibold text-foreground">{complaint.name}</span>
              {complaint.isCritical && (
                <AlertTriangle className="w-3 h-3 text-rose-500" />
              )}
            </div>
            <div className="text-[10px] font-medium text-muted-foreground">Order {complaint.order}</div>
          </div>
        </div>
        <StatusPill status={complaint.tag} />
      </div>

      <p className="text-[12px] text-muted-foreground leading-relaxed mb-3 italic">
        &ldquo;{complaint.text}&rdquo;
      </p>

      <div className="flex items-center justify-between pt-2.5 border-t border-border/50">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn('w-3 h-3', i < complaint.rating ? 'text-amber-400 fill-amber-400' : 'text-border')}
            />
          ))}
        </div>
        <div className="text-[10px] font-medium text-muted-foreground">
          {complaint.rider ? `Rider: ${complaint.rider}` : complaint.picker ? `Picker: ${complaint.picker}` : ''}
        </div>
      </div>
    </div>
  );
};
