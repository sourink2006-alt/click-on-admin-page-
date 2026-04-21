"use client";

import React from 'react';
import { SectionCard } from '@/components/SectionCard';
import { StatusPill } from '@/components/StatusPill';
import { MetricCard } from '@/components/MetricCard';
import { Inbox, CheckCircle2, AlertCircle, ShoppingCart } from 'lucide-react';

export default function GRNPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">GRN / Inwarding</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Verification and scanning of incoming supply deliveries</p>
        </div>
        <button className="bg-[#1D9E75] text-white px-5 py-2.5 rounded-xl font-bold text-[12px] shadow-lg shadow-[#1D9E75]/20 hover:bg-[#1D9E75]/90 transition-all flex items-center gap-2">
          + New GRN Entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard label="Expected Deliveries" value="5" icon={Inbox} color="indigo" />
        <MetricCard label="Scanning Progress" value="62%" icon={ShoppingCart} color="amber" />
        <MetricCard label="Discrepancies" value="2" subtext="Requires audit" icon={AlertCircle} color="rose" />
      </div>

      <div className="space-y-6">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Live Receiving Log</h3>
        
        <SectionCard 
          title="GRN-0142 · Amul Dairy"
          headerActions={<StatusPill status="in progress" />}
        >
          <div className="space-y-1 mb-6">
            <div className="flex items-center justify-between py-3 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[13px] font-bold text-slate-700">Amul butter 500g</span>
              </div>
              <span className="text-[11px] font-bold text-slate-400">Exp: 24 · Scanned: 24 (OK)</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[13px] font-bold text-slate-700">Amul milk 1L</span>
              </div>
              <span className="text-[11px] font-bold text-slate-400">Exp: 36 · Scanned: 36 (OK)</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-[13px] font-bold text-slate-700">Amul ghee 1kg</span>
              </div>
              <span className="text-[11px] font-bold text-amber-600">Exp: 12 · Scanned: 9 (Short by 3)</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span className="text-[13px] font-bold text-slate-700">Amul paneer 200g</span>
              </div>
              <span className="text-[11px] font-bold text-rose-600">Exp: 18 · Not yet scanned</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[11px] font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition-all uppercase">Mark Complete</button>
            <button className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-[11px] font-bold hover:bg-rose-100 transition-all uppercase">Raise Discrepancy</button>
          </div>
        </SectionCard>

        <SectionCard 
          title="GRN-0141 · Britannia"
          headerActions={<StatusPill status="done" />}
        >
          <div className="space-y-1 opacity-60 grayscale-[0.5]">
            <div className="flex items-center justify-between py-3 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-[13px] font-bold text-slate-700">Good Day 250g</span>
              </div>
              <span className="text-[11px] font-bold text-slate-400">48 / 48 ✓</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-[13px] font-bold text-slate-700">Bread (brown)</span>
              </div>
              <span className="text-[11px] font-bold text-slate-400">36 / 36 ✓</span>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
