"use client";

import React from 'react';
import { Check, AlertTriangle, X, Clock, Truck, Package, CheckCheck, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusPillProps {
  status: string;
  className?: string;
}

type PillConfig = {
  icon?: React.ReactNode;
  style: string;
  label?: string;   // optional display label override
};

const PILL_MAP: Record<string, PillConfig> = {
  // Orders
  picking:     { icon: <Activity className="w-2.5 h-2.5" />,     style: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-400 dark:ring-indigo-500/30' },
  packing:     { icon: <Package  className="w-2.5 h-2.5" />,     style: 'bg-amber-50  text-amber-700  ring-1 ring-amber-200  dark:bg-amber-500/15  dark:text-amber-400  dark:ring-amber-500/30'  },
  transit:     { icon: <Truck    className="w-2.5 h-2.5" />,     style: 'bg-sky-50    text-sky-700    ring-1 ring-sky-200    dark:bg-sky-500/15    dark:text-sky-400    dark:ring-sky-500/30'    },
  delayed:     { icon: <AlertTriangle className="w-2.5 h-2.5" />,style: 'bg-rose-50   text-rose-700   ring-1 ring-rose-200   dark:bg-rose-500/15   dark:text-rose-400   dark:ring-rose-500/30'   },
  done:        { icon: <CheckCheck className="w-2.5 h-2.5" />,   style: 'bg-slate-100 text-slate-500  ring-1 ring-slate-200  dark:bg-slate-700/30  dark:text-slate-400  dark:ring-slate-600/30'  },

  // Returns/batches
  pending:     { icon: <Clock    className="w-2.5 h-2.5" />,     style: 'bg-amber-50  text-amber-700  ring-1 ring-amber-200  dark:bg-amber-500/15  dark:text-amber-400  dark:ring-amber-500/30'  },
  approved:    { icon: <Check    className="w-2.5 h-2.5" />,     style: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:ring-emerald-500/30' },
  rejected:    { icon: <X       className="w-2.5 h-2.5" />,     style: 'bg-rose-50   text-rose-700   ring-1 ring-rose-200   dark:bg-rose-500/15   dark:text-rose-400   dark:ring-rose-500/30'   },
  completed:   { icon: <CheckCheck className="w-2.5 h-2.5" />,  style: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:ring-emerald-500/30' },
  'in progress':{ icon: <Activity className="w-2.5 h-2.5" />,   style: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-400 dark:ring-indigo-500/30' },
  confirmed:   { icon: <Check    className="w-2.5 h-2.5" />,     style: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:ring-emerald-500/30' },

  // Inventory
  ok:          { icon: <Check    className="w-2.5 h-2.5" />,     style: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:ring-emerald-500/30' },
  critical:    { icon: <X       className="w-2.5 h-2.5" />,     style: 'bg-rose-500  text-white       ring-1 ring-rose-600   dark:bg-rose-600      dark:text-white       dark:ring-rose-700'        },
  low:         { icon: <AlertTriangle className="w-2.5 h-2.5" />,style: 'bg-amber-500 text-white       ring-1 ring-amber-600  dark:bg-amber-600     dark:text-white       dark:ring-amber-700'       },

  // Bins
  stocked:     { icon: <Check    className="w-2.5 h-2.5" />,     style: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:ring-emerald-500/30' },
  empty:       { icon: <AlertTriangle className="w-2.5 h-2.5" />,style: 'bg-rose-50   text-rose-700   ring-1 ring-rose-200   dark:bg-rose-500/15   dark:text-rose-400   dark:ring-rose-500/30'   },
  picker:      { icon: <Activity className="w-2.5 h-2.5" />,     style: 'bg-sky-500   text-white       ring-1 ring-sky-600    dark:bg-sky-600       dark:text-white       dark:ring-sky-700'         },

  // Personnel
  incoming:    { icon: <Truck    className="w-2.5 h-2.5" />,     style: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200 dark:bg-violet-500/15 dark:text-violet-400 dark:ring-violet-500/30' },
  standby:     { icon: <Clock    className="w-2.5 h-2.5" />,     style: 'bg-slate-100 text-slate-500  ring-1 ring-slate-200  dark:bg-slate-700/30  dark:text-slate-400  dark:ring-slate-600/30'  },
};

export const StatusPill: React.FC<StatusPillProps> = ({ status, className }) => {
  const key = status.toLowerCase();
  const config = PILL_MAP[key];

  const style = config?.style ?? 'bg-slate-100 text-slate-500 ring-1 ring-slate-200 dark:bg-slate-700/30 dark:text-slate-400';
  const icon  = config?.icon;
  const label = config?.label ?? status;

  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide',
      style,
      className
    )}>
      {icon}
      {label}
    </span>
  );
};
