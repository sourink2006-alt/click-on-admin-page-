"use client";

import React from 'react';
import { SectionCard } from '@/components/SectionCard';
import { MetricCard } from '@/components/MetricCard';
import { Tag, Zap, Percent, Clock, ChevronRight } from 'lucide-react';
import { MOCK_DATA } from '@/lib/mockData';

export default function PricingPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Price Control</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Manage dynamic pricing, flash deals, and expiry-based discounts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SectionCard title="Deal of the Hour">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-[14px] font-bold text-slate-900">Amul Ice Cream 750ml</h4>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Active until 7:00 PM · 30% OFF</p>
              </div>
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ring-1 ring-amber-200">Flash Deal</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black text-[#1D9E75]">₹175</span>
              <span className="text-sm font-bold text-slate-400 line-through">₹249</span>
            </div>
          </div>
          <button className="w-full py-3 bg-white border-2 border-dashed border-slate-200 rounded-xl text-[12px] font-bold text-slate-400 hover:border-[#1D9E75] hover:text-[#1D9E75] transition-all">
            + Create New Flash Deal
          </button>
        </SectionCard>

        <SectionCard title="Expiry Auto-Discount Rules">
          <div className="space-y-4">
            {[
              { label: '3 days to expiry', disc: '10% OFF', active: true },
              { label: '1 day to expiry', disc: '25% OFF', active: true },
              { label: 'Same-day expiry', disc: '50% OFF', active: true, color: 'text-rose-600' },
            ].map((rule, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 group hover:border-[#1D9E75]/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${rule.active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">{rule.label}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[11px] font-black uppercase ${rule.color || 'text-emerald-700'}`}>{rule.disc}</span>
                  <div className={`w-10 h-5 rounded-full p-1 transition-all flex cursor-pointer ${rule.active ? 'bg-[#1D9E75] justify-end' : 'bg-slate-200 justify-start'}`}>
                    <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Active Price List">
        <div className="space-y-1">
          {[
            { name: 'Amul butter 500g', price: '₹280', label: 'Expiring soon', labelColor: 'bg-rose-100 text-rose-700' },
            { name: 'Amul ice cream 750ml', price: '₹175', old: '₹249', label: 'Flash', labelColor: 'bg-amber-100 text-amber-700' },
            { name: 'Coke 2L', price: '₹90' },
            { name: 'Parle-G 800g', price: '₹50', disc: '5% off' },
            { name: 'Eggs tray (30)', price: '₹72' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 group hover:bg-slate-50/50 px-2 rounded-xl transition-all">
              <div className="flex items-center gap-4">
                <span className="text-[13px] font-bold text-slate-700">{item.name}</span>
                {item.label && <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${item.labelColor}`}>{item.label}</span>}
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 text-[14px] font-black text-slate-900">
                    {item.old && <span className="text-[11px] text-slate-300 line-through">₹{item.old}</span>}
                    {item.price}
                  </div>
                  {item.disc && <div className="text-[10px] font-bold text-[#1D9E75]">{item.disc}</div>}
                </div>
                <button className="text-slate-300 group-hover:text-[#1D9E75] transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
