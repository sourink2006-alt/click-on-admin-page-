"use client";

import React, { useState } from 'react';
import { MOCK_DATA, IncomingBatch } from '@/lib/mockData';
import { SectionCard } from '@/components/SectionCard';
import { Table, Column } from '@/components/Table';
import { StatusPill } from '@/components/StatusPill';
import { MetricCard } from '@/components/MetricCard';
import { 
  Truck, 
  Calendar, 
  Search, 
  Clock, 
  ArrowRight,
  Filter,
  Inbox
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function IncomingStockPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { incomingBatches } = MOCK_DATA;

  const filteredBatches = incomingBatches.filter(b => 
    b.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: Column<IncomingBatch>[] = [
    { 
      header: "Batch ID", 
      accessor: (b) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
            <Inbox className="w-5 h-5" />
          </div>
          <div className="font-black text-slate-900 tracking-tight">{b.id}</div>
        </div>
      )
    },
    { header: "Supplier", accessor: "supplier", className: "font-bold text-slate-700" },
    { 
      header: "SKUs / Units", 
      accessor: (b) => (
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900">{b.skus}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Categories</span>
        </div>
      )
    },
    { 
      header: "ETA", 
      accessor: (b) => (
        <div className="flex items-center gap-2 text-slate-500 font-bold text-[13px]">
          <Clock className="w-3.5 h-3.5 text-[#1D9E75]" />
          {b.expectedAt}
        </div>
      )
    },
    { 
      header: "Transit Progress", 
      accessor: (b) => (
        <div className="w-48 space-y-2">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
            <span className={cn(b.progress > 0 ? "text-[#1D9E75]" : "text-slate-300")}>Origin</span>
            <span className={cn(b.progress === 100 ? "text-[#1D9E75]" : "text-slate-300")}>Store</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1D9E75] transition-all duration-1000 relative"
              style={{ width: `${b.progress}%` }}
            >
              <div className="absolute right-0 top-0 w-4 h-full bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>
      )
    },
    { 
      header: "Status", 
      accessor: (b) => <StatusPill status={b.status} />
    },
    {
      header: "",
      accessor: () => (
        <button className="p-2 rounded-xl text-slate-300 hover:text-[#1D9E75] hover:bg-[#1D9E75]/5 transition-all">
          <ArrowRight className="w-5 h-5" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Incoming Batches</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Live tracking of supply deliveries arriving today</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search supplier or batch..." 
              className="pl-11 h-12 bg-white border-slate-200 rounded-2xl shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="h-12 w-12 flex items-center justify-center bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard label="Active Transit" value={incomingBatches.filter(b => b.progress > 0 && b.progress < 100).length} icon={Truck} color="emerald" />
        <MetricCard label="Pending Confirmation" value={incomingBatches.filter(b => b.status === 'pending').length} icon={Clock} color="amber" />
        <MetricCard label="Next Delivery" value={incomingBatches[0].expectedAt} subtext={incomingBatches[0].supplier} icon={Calendar} color="indigo" />
        <MetricCard label="Arrival Accuracy" value="98.2%" subtext="Last 7 days" icon={Truck} color="slate" />
      </div>

      <div className="space-y-6">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Arrival Timeline</h3>
        <SectionCard>
          <Table columns={columns} data={filteredBatches} />
          {filteredBatches.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-sm">
                <Truck className="w-8 h-8 text-slate-200" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900">No incoming batches found</p>
                <p className="text-xs text-slate-400 font-medium">Try adjusting your search or filters</p>
              </div>
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
