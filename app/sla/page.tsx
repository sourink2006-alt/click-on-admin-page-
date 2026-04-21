"use client";

import React from 'react';
import { MOCK_DATA } from '@/lib/mockData';
import { SectionCard } from '@/components/SectionCard';
import { MetricCard } from '@/components/MetricCard';
import { AlertTriangle, Clock, Target, ArrowRight } from 'lucide-react';
import { StatusPill } from '@/components/StatusPill';

export default function SLAPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">SLA Performance</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Service Level Agreement tracking and breach analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard label="Breaches Today" value="3" subtext="↑ 1 vs avg" icon={AlertTriangle} color="rose" />
        <MetricCard label="Avg Breach Delay" value="+4.8m" icon={Clock} color="amber" />
        <MetricCard label="Compliance Rate" value="98.8%" subtext="Target: 99%" icon={Target} color="emerald" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <SectionCard title="Recent Breach Drill-down">
          <div className="space-y-4">
            {[
              { id: '#4818', name: 'Priya R.', elapsed: '12:20', cause: 'Picker delay', detail: 'Divya S. was on another order — waited 3m for reassignment' },
              { id: '#4802', name: 'Anil T.', elapsed: '11:44', cause: 'Item not found', detail: 'Brown bread bin was empty — picker searched for 4m', isWarn: true },
              { id: '#4791', name: 'Meera S.', elapsed: '13:10', cause: 'Rider unavailable', detail: 'All nearby riders were in transit — no rider for 5m' }
            ].map((breach, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-rose-100 bg-rose-50/20 group hover:bg-rose-50/50 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-slate-900">{breach.id} — {breach.name}</div>
                  <div className="text-[11px] font-bold text-rose-600 font-mono">{breach.elapsed} / 10m</div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill status={breach.cause} className={breach.isWarn ? 'bg-amber-100 text-amber-700 border-amber-200' : ''} />
                  <p className="text-[12px] text-slate-600 font-medium">"{breach.detail}"</p>
                </div>
                <button className="mt-4 text-[11px] font-bold text-slate-400 group-hover:text-rose-600 flex items-center gap-2 transition-all">
                  VIEW RESOLUTION SUGGESTION <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Common Breach Causes — This Week">
          <div className="space-y-6 mt-4">
            {[
              { label: 'Rider Gap', value: 8, color: '#EF4444', pct: 55 },
              { label: 'Picker Delay', value: 6, color: '#F59E0B', pct: 40 },
              { label: 'Item Not Found', value: 4, color: '#3B82F6', pct: 27 },
              { label: 'System Lag', value: 2, color: '#64748b', pct: 13 }
            ].map((cause, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                  <span>{cause.label}</span>
                  <span className="text-slate-900">{cause.value} incidents</span>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-lg overflow-hidden flex">
                  <div 
                    className="h-full rounded-lg transition-all duration-1000 flex items-center px-2 text-[9px] font-bold text-white"
                    style={{ width: `${cause.pct}%`, backgroundColor: cause.color }}
                  >
                    {cause.pct}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
