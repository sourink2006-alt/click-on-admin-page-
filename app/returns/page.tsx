"use client";

import React, { useState } from 'react';
import { MOCK_DATA, ReturnRequest } from '@/lib/mockData';
import { SectionCard } from '@/components/SectionCard';
import { Table, Column } from '@/components/Table';
import { StatusPill } from '@/components/StatusPill';
import { MetricCard } from '@/components/MetricCard';
import { RefreshCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { ImagePreview } from '@/components/ImagePreview';

export default function ReturnsPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const { returns } = MOCK_DATA;

  const filteredReturns = filter === 'all' 
    ? returns 
    : returns.filter(r => r.status === filter);

  const columns: Column<ReturnRequest>[] = [
    { 
      header: "Request / Order", 
      accessor: (r) => (
        <div>
          <div className="font-bold text-slate-900">{r.id}</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{r.orderId}</div>
        </div>
      )
    },
    { header: "Customer", accessor: "name" },
    { 
      header: "Issue Images", 
      accessor: (r) => <ImagePreview images={r.images} placeholder={r.item} /> 
    },
    { header: "Item", accessor: "item" },
    { 
      header: "Reason", 
      accessor: (r) => (
        <div className="max-w-[200px]">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">{r.type}</div>
          <div className="text-[12px] truncate italic" title={r.reason}>"{r.reason}"</div>
        </div>
      )
    },
    { header: "Amount", accessor: "amount", className: "font-mono font-bold text-rose-600" },
    { 
      header: "Status", 
      accessor: (r) => <StatusPill status={r.status} />
    },
    { 
      header: "Actions", 
      accessor: (r) => r.status === 'pending' ? (
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold border border-emerald-100 hover:bg-emerald-100 transition-all uppercase">Approve</button>
          <button className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-bold border border-rose-100 hover:bg-rose-100 transition-all uppercase">Reject</button>
        </div>
      ) : null
    }
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Returns & Refunds</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Manage reverse logistics and customer claims</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard label="Total Requests" value={returns.length} icon={RefreshCcw} color="slate" />
        <MetricCard label="Pending" value={returns.filter(r => r.status === 'pending').length} icon={AlertCircle} color="amber" />
        <MetricCard label="Approved" value={returns.filter(r => r.status === 'approved').length} icon={CheckCircle} color="emerald" />
        <MetricCard label="Value Lost" value="₹412" subtext="Today's total" icon={XCircle} color="rose" />
      </div>

      <SectionCard
        headerActions={
          <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
            {['all', 'pending', 'approved', 'rejected'].map(v => (
              <button
                key={v}
                onClick={() => setFilter(v as any)}
                className={`px-4 py-2 rounded-lg text-[11px] font-bold transition-all uppercase ${
                  filter === v ? 'bg-white text-[#1D9E75] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        }
      >
        <Table columns={columns} data={filteredReturns} />
      </SectionCard>
    </div>
  );
}
