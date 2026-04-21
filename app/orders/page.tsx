"use client";

import React, { useState } from 'react';
import { MOCK_DATA, OrderStatus, Order } from '@/lib/mockData';
import { SectionCard } from '@/components/SectionCard';
import { Table, Column } from '@/components/Table';
import { StatusPill } from '@/components/StatusPill';
import { MetricCard } from '@/components/MetricCard';
import { ShoppingBag, Clock, AlertTriangle, Eye } from 'lucide-react';

export default function OrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const { orders } = MOCK_DATA;

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  const stats = {
    total: orders.length,
    delayed: orders.filter(o => o.status === 'delayed').length,
    transit: orders.filter(o => o.status === 'transit').length
  };

  const columns: Column<Order>[] = [
    { header: "Order ID", accessor: "id", className: "font-bold text-slate-900" },
    { header: "Customer", accessor: "name" },
    { header: "Items", accessor: "items", className: "text-slate-400" },
    { header: "Amount", accessor: "amount", className: "font-bold text-slate-700" },
    { header: "Picker", accessor: "picker" },
    { 
      header: "Status", 
      accessor: (o) => <StatusPill status={o.label} />
    },
    { header: "Timer", accessor: "timer", className: "font-mono font-bold text-[#1D9E75]" },
    { 
      header: "Action", 
      accessor: (o) => (
        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-[#1D9E75] transition-all">
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  const filters: { label: string, value: OrderStatus | 'all' }[] = [
    { label: 'All Orders', value: 'all' },
    { label: 'Picking', value: 'picking' },
    { label: 'Packing', value: 'packing' },
    { label: 'In Transit', value: 'transit' },
    { label: 'Delayed', value: 'delayed' },
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Live Fulfillment</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Real-time monitoring of every order in the pipeline</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          label="Active Orders" 
          value={stats.total} 
          icon={ShoppingBag}
          color="emerald"
        />
        <MetricCard 
          label="In Transit" 
          value={stats.transit} 
          icon={Clock}
          color="indigo"
        />
        <MetricCard 
          label="SLA Warnings" 
          value={stats.delayed} 
          subtext="Orders past 10m target"
          trend="down"
          trendValue="12%"
          icon={AlertTriangle}
          color="rose"
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
          data={filteredOrders} 
        />
      </SectionCard>
    </div>
  );
}
