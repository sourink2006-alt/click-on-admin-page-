"use client";

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  IndianRupee, 
  TrendingUp, 
  Percent, 
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { MOCK_DATA } from '@/lib/mockData';
import { MetricCard } from '@/components/MetricCard';
import { SectionCard } from '@/components/SectionCard';

export default function PLPage() {
  const { pnl, weeklyProfit } = MOCK_DATA;
  
  const revenue = pnl.find(i => i.label === 'Gross revenue')?.value || 0;
  const netProfit = 18300; // Mock derived
  const margin = ((netProfit / revenue) * 100).toFixed(1);

  const costData = pnl.filter(i => i.type === 'negative').map(i => ({
    name: i.label,
    value: Math.abs(i.value)
  }));

  const COLORS = ['#1D9E75', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Performance</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Deep dive into store P&L, margins, and cost structures</p>
        </div>
      </div>

      {/* High-level Fin Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          label="Revenue (Today)" 
          value={`₹${(revenue/1000).toFixed(1)}k`} 
          subtext="↑ 12% vs yesterday"
          trend="up"
          trendValue="12%"
          icon={IndianRupee}
          color="emerald"
        />
        <MetricCard 
          label="Net Profit" 
          value={`₹${(netProfit/1000).toFixed(1)}k`} 
          subtext="↑ 14% vs avg"
          trend="up"
          trendValue="14%"
          icon={TrendingUp}
          color="indigo"
        />
        <MetricCard 
          label="Profit Margin" 
          value={`${margin}%`} 
          subtext="↑ 1.2% healthy"
          trend="up"
          trendValue="1.2%"
          icon={Percent}
          color="violet"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* P&L Table */}
        <SectionCard title="Today's P&L Breakdown" className="xl:col-span-2">
          <div className="space-y-1">
            {pnl.map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between py-3.5 border-b border-slate-50 last:border-0 group">
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${entry.type === 'positive' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  <span className="text-[13px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-tight">{entry.label}</span>
                </div>
                <div className={`text-[14px] font-bold font-mono ${entry.type === 'positive' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {entry.type === 'positive' ? '+' : '−'}₹{entry.value.toLocaleString()}
                </div>
              </div>
            ))}
            <div className="mt-6 bg-slate-50 rounded-2xl p-5 flex justify-between items-center border border-slate-100 shadow-inner">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Net Profit</div>
                <div className="text-2xl font-black text-emerald-700">₹{netProfit.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Margin Score</div>
                <div className="text-lg font-bold text-slate-900">{margin}%</div>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Cost Breakdown Pie */}
        <SectionCard title="Expense Distribution">
          <div className="h-[260px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {costData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {costData.map((entry, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{entry.name}</span>
                </div>
                <span className="text-[11px] font-bold text-slate-700">₹{entry.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Weekly Trend */}
      <SectionCard title="Weekly Profitability Trend">
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyProfit}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="profit" radius={[6, 6, 0, 0]} barSize={40}>
                {weeklyProfit.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.profit > 15000 ? '#1D9E75' : '#EF4444'} opacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
}
