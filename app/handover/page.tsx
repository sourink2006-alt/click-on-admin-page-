"use client";

import React from 'react';
import { SectionCard } from '@/components/SectionCard';
import { MOCK_DATA, Worker } from '@/lib/mockData';
import { StatusPill } from '@/components/StatusPill';
import { History, Users, Clock } from 'lucide-react';
import { Table, Column } from '@/components/Table';
import { cn } from '@/lib/utils';

export default function HandoverPage() {
  const { handover } = MOCK_DATA;

  const columns: Column<Worker>[] = [
    { 
      header: "Staff Name", 
      accessor: (w: Worker) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center font-bold text-[10px] text-muted-foreground border border-border">
            {w.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <span className="font-semibold text-foreground">{w.name}</span>
        </div>
      )
    },
    { header: "Role", accessor: "role", className: "text-muted-foreground" },
    { 
      header: "Shift Window", 
      accessor: (w: Worker) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-medium">{w.shift}</span>
        </div>
      )
    },
    { 
      header: "Reporting Status", 
      accessor: (w: Worker) => <StatusPill status={w.status} />
    }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-foreground tracking-tight">Shift Handover</h2>
          <p className="text-muted-foreground text-sm mt-0.5">Personnel transition for the upcoming operations window</p>
        </div>
      </div>

      {/* Handover Hero Card */}
      <div className="bg-primary rounded-xl p-8 text-primary-foreground flex justify-between items-center shadow-lg shadow-primary/20 relative overflow-hidden">
        {/* Subtle background decoration */}
        <ActivityIcon className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 rotate-12" />
        
        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-2 opacity-70 text-[10px] font-bold uppercase tracking-[0.2em]">
            <History className="w-4 h-4" />
            Active Handover Window
          </div>
          <h3 className="text-3xl font-bold tracking-tight">Morning → Evening Shift</h3>
          <p className="text-sm font-medium opacity-80 leading-relaxed max-w-md">
            14:00 Handover · Supervisor: Amit M. (Outgoing) / Renu K. (Incoming)
          </p>
        </div>
        
        <div className="hidden md:flex gap-8 relative z-10">
          <div className="text-right">
            <div className="text-4xl font-bold tabular-nums">100%</div>
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-60 mt-1">Readiness Score</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6">
        <SectionCard 
          title="Incoming Shift Personnel (Evening)"
          headerActions={
            <div className="flex items-center gap-2 text-muted-foreground text-[11px] font-semibold">
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
        
        <div className="p-8 rounded-xl bg-card border border-border border-dashed text-center">
          <p className="text-muted-foreground text-[13px] font-medium max-w-md mx-auto">
            Operational notes and issues have been cleared for this transition. All systems are reported nominal for the evening shift.
          </p>
        </div>
      </div>
    </div>
  );
}

// Inline helper for background decoration
function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
