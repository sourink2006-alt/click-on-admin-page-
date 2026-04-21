"use client";

import React from 'react';
import { SectionCard } from '@/components/SectionCard';
import { MetricCard } from '@/components/MetricCard';
import { CloudSun, Calendar, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

export default function ForecastPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Demand Forecast</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">AI-driven predictions based on weather, events, and historical trends</p>
        </div>
        <button className="bg-[#1D9E75] text-white px-5 py-2.5 rounded-xl font-bold text-[12px] shadow-lg shadow-[#1D9E75]/20 hover:bg-[#1D9E75]/90 transition-all flex items-center gap-2">
          <Zap className="w-4 h-4 fill-white" />
          Regenerate AI Forecast
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="bg-white border border-slate-100 rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm">
          <CloudSun className="w-4 h-4 text-amber-500" />
          <span className="text-[11px] font-bold text-slate-700">26°C · Sunny</span>
        </div>
        <div className="bg-white border border-slate-100 rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span className="text-[11px] font-bold text-slate-700">Saturday Schedule</span>
        </div>
        <div className="bg-rose-50 border border-rose-100 rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm">
          <Zap className="w-4 h-4 text-rose-500" />
          <span className="text-[11px] font-bold text-rose-700 uppercase tracking-tight">IPL Match 7pm Today</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SectionCard title="Predicted Top Sellers Tomorrow">
          <div className="space-y-6 mt-2">
            {[
              { name: 'Coke 2L', value: 95, color: '#3B82F6' },
              { name: 'Lays chips 50g', value: 72, color: '#F59E0B' },
              { name: 'Eggs tray (30)', value: 64, color: '#1D9E75' },
              { name: 'Amul ice cream', value: 58, color: '#8B5CF6' },
              { name: 'Amul butter 500g', value: 52, color: '#10b981' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-[12px] font-bold text-slate-600">
                  <span>{item.name}</span>
                  <span className="text-slate-900 font-mono">{item.value} units</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="space-y-6">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Demand Drivers</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl border-l-4 border-amber-500 bg-white shadow-sm border border-slate-100">
              <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">IPL MATCH — SAT 7:00 PM</div>
              <p className="text-[12px] text-slate-600 font-semibold leading-relaxed">
                Cold drinks, chips, and snacks expected to spike <span className="text-amber-600">+60%</span>. Ensure Zone C is pre-stocked by 4 PM.
              </p>
            </div>
            <div className="p-4 rounded-2xl border-l-4 border-[#1D9E75] bg-white shadow-sm border border-slate-100">
              <div className="text-[10px] font-black text-[#1D9E75] uppercase tracking-widest mb-1">WEEKEND PATTERN — SATURDAY</div>
              <p className="text-[12px] text-slate-600 font-semibold leading-relaxed">
                Breakfast essentials (Eggs, Bread, Butter) historically peak at <span className="text-[#1D9E75]">7–10 AM</span>. Prepare priority picking lists.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SectionCard title="Suggested Pre-stock Actions">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">SKU</th>
                <th className="py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Current Stock</th>
                <th className="py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Forecast</th>
                <th className="py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Gap</th>
                <th className="py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: 'Coke 2L', stock: 38, forecast: 95, gap: -57 },
                { name: 'Lays chips 50g', stock: 24, forecast: 72, gap: -48 },
                { name: 'Eggs tray (30)', stock: 11, forecast: 44, gap: -33 },
              ].map((row, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/50 transition-colors font-medium">
                  <td className="py-4 text-[13px] text-slate-800 font-bold">{row.name}</td>
                  <td className="py-4 text-[13px] text-slate-500 text-center">{row.stock}</td>
                  <td className="py-4 text-[13px] text-slate-500 text-center">{row.forecast}</td>
                  <td className="py-4 text-[13px] text-rose-600 font-black text-center">{row.gap}</td>
                  <td className="py-4 text-right">
                    <button className="text-[11px] font-bold text-[#1D9E75] uppercase hover:underline">Raise Urgent PO</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
