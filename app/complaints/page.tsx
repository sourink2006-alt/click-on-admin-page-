"use client";

import React from 'react';
import { MOCK_DATA } from '@/lib/mockData';
import { MetricCard } from '@/components/MetricCard';
import { ComplaintCard } from '@/components/ComplaintCard';
import { MessageSquare, Star, CheckCircle2, AlertCircle } from 'lucide-react';
import { SectionCard } from '@/components/SectionCard';

export default function ComplaintsPage() {
  const { complaints } = MOCK_DATA;
  
  const stats = {
    open: complaints.length,
    resolved: 11,
    avg: 4.1
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Customer Complaints</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Direct feedback and quality control dashboard</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard label="Open Issues" value={stats.open} icon={MessageSquare} color="rose" />
        <MetricCard label="Resolved Today" value={stats.resolved} icon={CheckCircle2} color="emerald" />
        <MetricCard 
          label="Avg Rating" 
          value={stats.avg} 
          subtext="↓ 0.2 vs avg"
          trend="down"
          trendValue="0.2"
          icon={Star} 
          color="amber" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500" />
            Unresolved Tickets
          </h3>
          <div className="space-y-4">
            {complaints.map(complaint => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Operational Impact</h3>
          <SectionCard title="Complaints by Category">
            <div className="space-y-6 mt-2">
              {[
                { label: 'Late Delivery', count: 8, pct: 45, color: '#EF4444' },
                { label: 'Quality / Expiry', count: 4, pct: 25, color: '#F59E0B' },
                { label: 'Wrong Items', count: 3, pct: 20, color: '#3B82F6' },
                { label: 'Packaging', count: 1, pct: 10, color: '#8B5CF6' }
              ].map((cat, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                    <span>{cat.label}</span>
                    <span className="text-slate-900">{cat.count} tickets</span>
                  </div>
                  <div className="h-4 w-full bg-slate-100 rounded-lg overflow-hidden flex">
                    <div 
                      className="h-full rounded-lg transition-all duration-1000 flex items-center px-2 text-[9px] font-bold text-white shadow-sm"
                      style={{ width: `${cat.pct}%`, backgroundColor: cat.color }}
                    >
                      {cat.pct}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h4 className="text-[13px] font-bold text-slate-900 mb-4">Quick Resolution Tools</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-left hover:bg-slate-100 transition-all">
                <div className="text-[11px] font-bold text-slate-900 mb-1 leading-tight">Apology Draft</div>
                <div className="text-[10px] text-slate-400 font-medium">Generate AI response</div>
              </button>
              <button className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-left hover:bg-slate-100 transition-all">
                <div className="text-[11px] font-bold text-slate-900 mb-1 leading-tight">Issue Refund</div>
                <div className="text-[10px] text-slate-400 font-medium">Automatic balance credit</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
