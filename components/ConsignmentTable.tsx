"use client";

import React from 'react';
import { Table, Column } from './Table';
import { StatusPill } from './StatusPill';
import { Package, MapPin, ExternalLink, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface ConsignmentProduct {
  sku: string;
  name: string;
  delivered: number;
  processed: number;
  location: string;
}

interface ConsignmentTableProps {
  products: ConsignmentProduct[];
  onUpdateLocation: (sku: string, location: string) => void;
}

const RACK_LOCATIONS = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'C1', 'C2', 'D1'];

export const ConsignmentTable: React.FC<ConsignmentTableProps> = ({ products, onUpdateLocation }) => {
  const columns: Column<ConsignmentProduct>[] = [
    {
      header: 'SKU / Product',
      accessor: (p) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground shrink-0">
            <Package className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[13px] font-semibold text-foreground leading-tight">{p.name}</div>
            <div className="text-[10px] font-medium text-primary uppercase tracking-wider mt-0.5">{p.sku}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Processing Status',
      accessor: (p) => {
        const pct = Math.round((p.processed / p.delivered) * 100);
        const isDone = p.processed === p.delivered;
        const isPending = p.processed === 0;

        return (
          <div className="flex items-center gap-4 min-w-[200px]">
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex justify-between items-center text-[10px] font-medium">
                <span className={cn(
                  isPending ? 'text-muted-foreground' :
                  isDone ? 'text-emerald-600 dark:text-emerald-400' :
                  'text-primary flex items-center gap-1'
                )}>
                  {isPending && 'Waiting for picker'}
                  {!isPending && isDone && 'All items stored'}
                  {!isPending && !isDone && <><Activity className="w-2.5 h-2.5 inline animate-pulse" /> In progress</>}
                </span>
                <span className="text-muted-foreground tabular-nums">
                  {p.processed}/{p.delivered}
                </span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all duration-700 rounded-full',
                    isDone ? 'bg-emerald-500' : 'bg-primary'
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        );
      }
    },
    {
      header: 'Rack Assignment',
      accessor: (p) => (
        <div className="flex items-center gap-1.5">
          <Select
            value={p.location}
            onValueChange={(val) => onUpdateLocation(p.sku, val)}
          >
            <SelectTrigger className="w-28 h-8 rounded-lg text-[12px] font-medium border-border">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-primary" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {RACK_LOCATIONS.map(loc => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Link
            href={`/floormap?bin=${p.location}`}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-150"
            title="View on Store Map"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: (p) => (
        <StatusPill
          status={p.processed === 0 ? 'pending' : p.processed < p.delivered ? 'in progress' : 'completed'}
        />
      )
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <Table
        columns={columns}
        data={products}
        rowClassName={(p) => cn(
          'transition-colors',
          p.processed === p.delivered && p.delivered > 0 ? 'bg-emerald-50/30 dark:bg-emerald-900/10' :
          p.processed > 0 ? 'bg-primary/[0.02]' : ''
        )}
      />
      {products.length === 0 && (
        <div className="py-16 text-center space-y-3">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground/40">
            <Package className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <p className="text-[13px] font-semibold text-foreground">No Items Loaded</p>
            <p className="text-[12px] text-muted-foreground">Select a batch from the arrivals panel</p>
          </div>
        </div>
      )}
    </div>
  );
};
