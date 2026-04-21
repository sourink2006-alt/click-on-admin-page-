"use client";

import React from 'react';
import { SectionCard } from '@/components/SectionCard';
import { MOCK_DATA, Worker } from '@/lib/mockData';
import { StatusPill } from '@/components/StatusPill';
import { History, Users, Clock } from 'lucide-react';
import { Table, Column } from '@/components/Table';

export default function HandoverPage() {
  const { handover } = MOCK_DATA;

  const columns: Column<Worker>[] = [
    { 
      header: "Staff Name", 
      accessor: (w) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-500">
            {w.name.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="font-bold text-slate-900">{w.name}</span>
        </div>
      )
    },
    { header: "Role", accessor: "role" },
    { 
      header: "Shift Window", 
      accessor: (w) => (
        <div className="flex items-center gap-2 text-slate-400">
          <Clock className="w-3 h-3" />
          <span className="font-medium">{w.shift}</span>
        </div>
      )
    },
    { 
      header: "Reporting Status", 
      accessor: (w) => <StatusPill status={w.status} />
    }
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Shift Handover</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Personnel transition for the upcoming operations window</p>
        </div>
      </div>

      <div className="bg-[#1D9E75] rounded-2xl p-8 text-white flex justify-between items-center shadow-lg shadow-[#1D9E75]/20">
        <div className="space-y-2">
          <div className="flex items-center gap-2 opacity-80 text-[11px] font-bold uppercase tracking-widest">
            <History className="w-4 h-4" />
            Active Handover Window
          </div>
          <h3 className="text-3xl font-black">Morning → Evening Shift</h3>
          <p className="text-sm font-medium opacity-90">14:00 Handover · Supervisor: Amit M. (Outgoing) / Renu K. (Incoming)</p>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="text-right">
            <div className="text-3xl font-black">100%</div>
            <div className="text-[10px] font-bold uppercase opacity-70">Readiness Score</div>
          </div>
        </div>
      </div>

      <SectionCard 
        title="Incoming Shift Personnel (Evening)"
        headerActions={
          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold">
            <Users className="w-4 h-4" />
            {handover.length} TOTAL STAFF
          </div>
        }
      >
        <Table 
          columns={columns} 
          data={handover} 
        />
      </SectionCard>
      
      <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm border-dashed text-center">
        <p className="text-slate-400 text-[13px] font-medium">Operational notes and issues have been cleared for this transition.</p>
      </div>
    </div>
  );
}
