"use client";

import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: LucideIcon;
  color?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'violet' | 'slate';
}

const colorMap = {
  indigo:  { icon: 'bg-indigo-50  text-indigo-600  dark:bg-indigo-500/15  dark:text-indigo-400',  ring: 'ring-indigo-100  dark:ring-indigo-500/20'  },
  emerald: { icon: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400', ring: 'ring-emerald-100 dark:ring-emerald-500/20' },
  amber:   { icon: 'bg-amber-50   text-amber-600   dark:bg-amber-500/15   dark:text-amber-400',   ring: 'ring-amber-100   dark:ring-amber-500/20'   },
  rose:    { icon: 'bg-rose-50    text-rose-600    dark:bg-rose-500/15    dark:text-rose-400',    ring: 'ring-rose-100    dark:ring-rose-500/20'    },
  violet:  { icon: 'bg-violet-50  text-violet-600  dark:bg-violet-500/15  dark:text-violet-400',  ring: 'ring-violet-100  dark:ring-violet-500/20'  },
  slate:   { icon: 'bg-slate-100  text-slate-500   dark:bg-slate-700/30   dark:text-slate-400',   ring: 'ring-slate-100   dark:ring-slate-700/30'   },
};

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  trend,
  trendValue,
  icon: Icon,
  color = 'indigo',
}) => {
  const c = colorMap[color];

  return (
    <div className={cn(
      "bg-card border border-border rounded-xl p-4",
      "shadow-sm hover:shadow-md",
      "transition-all duration-150 hover:-translate-y-0.5",
      "group cursor-default"
    )}>
      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <div className={cn('p-2 rounded-lg ring-1', c.icon, c.ring)}>
          <Icon className="w-4 h-4" />
        </div>

        {trend && trendValue && (
          <div className={cn(
            'flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-semibold',
            trend === 'up'   && 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
            trend === 'down' && 'bg-rose-50    text-rose-700    dark:bg-rose-500/15    dark:text-rose-400',
            trend === 'neutral' && 'bg-muted text-muted-foreground',
          )}>
            {trend === 'up'   && <TrendingUp   className="w-3 h-3" />}
            {trend === 'down' && <TrendingDown  className="w-3 h-3" />}
            {trendValue}
          </div>
        )}
      </div>

      {/* Metric */}
      <div className="space-y-0.5">
        <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
          {label}
        </div>
        <div className="text-2xl font-bold text-foreground tabular-nums leading-none">
          {value}
        </div>
        {subtext && (
          <div className="text-[11px] text-muted-foreground pt-0.5">{subtext}</div>
        )}
      </div>
    </div>
  );
};
