"use client";

import React, { useState } from 'react';
import { MOCK_DATA, InventoryItem } from '@/lib/mockData';
import { SectionCard } from '@/components/SectionCard';
import { Table, Column } from '@/components/Table';
import { StatusPill } from '@/components/StatusPill';
import { MetricCard } from '@/components/MetricCard';
import { Package, AlertCircle, ShoppingCart, RefreshCw } from 'lucide-react';

export default function InventoryPage() {
  const [filter, setFilter] = useState<'all' | 'critical' | 'low' | 'ok'>('all');
  const { inventory } = MOCK_DATA;

  const filteredInventory = filter === 'all' 
    ? inventory 
    : inventory.filter(i => i.status === filter);

  const stats = {
    total: inventory.length,
    critical: inventory.filter(i => i.status === 'critical').length,
    low: inventory.filter(i => i.status === 'low').length,
  };

  const columns: Column<InventoryItem>[] = [
    { header: "SKU / Name", accessor: "name", className: "font-bold text-slate-900" },
    { header: "Category", accessor: "category", className: "text-slate-500" },
    { 
      header: "Stock Level", 
      accessor: (i: InventoryItem) => {
        const pct = Math.min((i.stock / i.max) * 100, 100);
        return (
          <div className="flex items-center gap-3">
            <span className={`font-mono font-bold w-6 ${i.status === 'critical' ? 'text-rose-600' : 'text-slate-700'}`}>{i.stock}</span>
            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${i.status === 'critical' ? 'bg-rose-500' : i.status === 'low' ? 'bg-amber-500' : 'bg-[#1D9E75]'}`} 
                style={{ width: `${pct}%` }} 
              />
            </div>
          </div>
        );
      }
    },
    { 
      header: "Status", 
      accessor: (i: InventoryItem) => <StatusPill status={i.status} />
    },
    { header: "Reorder @", accessor: "reorder" as const, className: "text-slate-400 text-center" },
    { header: "Supplier", accessor: "supplier" as const },
    { header: "Expiry", accessor: "expiry" as const, className: "text-slate-400 font-medium" },
    { 
      header: "Action", 
      accessor: (i: InventoryItem) => (
        <button className="text-[11px] font-bold text-[#1D9E75] hover:underline uppercase tracking-tight">
          Raise PO
        </button>
      )
    }
  ];

  const filters: { label: string, value: 'all' | 'critical' | 'low' | 'ok' }[] = [
    { label: 'All Items', value: 'all' },
    { label: 'Critical', value: 'critical' },
    { label: 'Low Stock', value: 'low' },
    { label: 'OK', value: 'ok' },
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Inventory Management</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Dark store stock levels and automated procurement control</p>
        </div>
        <button className="bg-[#1D9E75] text-white px-5 py-2.5 rounded-xl font-bold text-[12px] shadow-lg shadow-[#1D9E75]/20 hover:bg-[#1D9E75]/90 transition-all flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Auto Reorder All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Total SKUs" 
          value={stats.total} 
          icon={Package}
          color="slate"
        />
        <MetricCard 
          label="Critical" 
          value={stats.critical} 
          subtext="Immediate PO Required"
          icon={AlertCircle}
          color="rose"
        />
        <MetricCard 
          label="Low Stock" 
          value={stats.low} 
          subtext="Monitoring threshold"
          icon={ShoppingCart}
          color="amber"
        />
        <MetricCard 
          label="Auto-POs" 
          value={3} 
          subtext="Raised last 24h"
          icon={RefreshCw}
          color="emerald"
        />
      </div>

      <SectionCard
        headerActions={
          <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
            {filters.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${
                  filter === f.value 
                    ? 'bg-white text-[#1D9E75] shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        }
      >
        <Table 
          columns={columns} 
          data={filteredInventory} 
        />
      </SectionCard>
    </div>
  );
}
