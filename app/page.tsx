"use client";

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  ShoppingCart,
  Clock,
  MessageSquare,
  Timer,
  ChevronRight,
  TrendingUp,
  Target,
} from 'lucide-react';
import { MOCK_DATA, Order } from '@/lib/mockData';
import { MetricCard } from '@/components/MetricCard';
import { SectionCard } from '@/components/SectionCard';
import { Table, Column } from '@/components/Table';
import { StatusPill } from '@/components/StatusPill';
import { ComplaintCard } from '@/components/ComplaintCard';
import Link from 'next/link';

// SLA compliance animated ring
const SlaWidget = ({ value = 97.4, target = 98.2 }: { value?: number; target?: number }) => {
  const radius = 42;
  const circ = 2 * Math.PI * radius;
  const dash = (value / 100) * circ;

  return (
    <div className="bg-primary rounded-xl p-5 text-primary-foreground shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest opacity-70">Weekly SLA</p>
          <p className="text-2xl font-bold leading-none mt-1">{value}%</p>
          <p className="text-[11px] opacity-70 mt-1">Target: {target}%</p>
        </div>
        <div className="relative w-[100px] h-[100px]">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {/* Track */}
            <circle
              cx="50" cy="50" r={radius}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.15"
              strokeWidth="9"
            />
            {/* Fill */}
            <circle
              cx="50" cy="50" r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ - dash}`}
              className="transition-[stroke-dasharray] duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Target className="w-5 h-5 opacity-60" />
          </div>
        </div>
      </div>
      <div className="h-px bg-white/10 mb-3" />
      <p className="text-[11px] opacity-80 leading-relaxed">
        {(target - value).toFixed(1)}% below target. Reduce packing delays in Zone B to meet SLA.
      </p>
    </div>
  );
};

// Custom tooltip for the chart
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-[12px]">
      <p className="font-semibold text-foreground">{label}</p>
      <p className="text-primary font-bold">{payload[0]?.value} orders</p>
    </div>
  );
};

export default function OverviewPage() {
  const { orders, complaints, hourlyOrders } = MOCK_DATA;

  const activeOrdersCount = orders.length;
  const complaintsCount = complaints.length;
  const avgDelivery = '9.4m';
  const avgPicking = '2.8m';
  const hourlyPeak = Math.max(...hourlyOrders.map((o) => o.count));

  const orderColumns: Column<Order>[] = [
    { header: 'Order ID', accessor: 'id', className: 'font-semibold text-foreground' },
    { header: 'Customer',  accessor: 'name', className: 'text-muted-foreground' },
    { header: 'Status',    accessor: (o) => <StatusPill status={o.label} /> },
    { header: 'Timer',     accessor: 'timer' as const, className: 'font-mono font-semibold text-muted-foreground tabular-nums' },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-foreground tracking-tight">Store Dashboard</h2>
          <p className="text-muted-foreground text-sm mt-0.5">Real-time operational overview · HSR Layout, Blr</p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[12px] font-semibold text-foreground">Live Ops Connected</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard
          label="Active Orders"
          value={activeOrdersCount}
          subtext="↑ 18% vs yesterday"
          trend="up"
          trendValue="18%"
          icon={ShoppingCart}
          color="indigo"
        />
        <MetricCard
          label="Complaints"
          value={complaintsCount}
          subtext="Unresolved issues"
          trend="down"
          trendValue="2"
          icon={MessageSquare}
          color="rose"
        />
        <MetricCard
          label="Avg Delivery"
          value={avgDelivery}
          subtext="↓ 0.6m faster"
          trend="up"
          trendValue="faster"
          icon={Clock}
          color="emerald"
        />
        <MetricCard
          label="Avg Picking"
          value={avgPicking}
          subtext="Consistent performance"
          icon={Timer}
          color="amber"
        />
        <MetricCard
          label="Peak Hourly"
          value={hourlyPeak}
          subtext="Orders at 6pm"
          icon={TrendingUp}
          color="violet"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column: Table + Chart */}
        <div className="xl:col-span-2 space-y-6">
          <SectionCard
            title="Live Fulfillment Queue"
            headerActions={
              <Link
                href="/orders"
                className="text-primary text-[11px] font-semibold flex items-center gap-0.5 hover:underline underline-offset-2"
              >
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            }
          >
            <Table columns={orderColumns} data={orders.slice(0, 6)} />
          </SectionCard>

          {/* Area Chart — Hourly Order Volume */}
          <SectionCard title="Hourly Order Volume — Today">
            <div className="h-[240px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyOrders} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="volumeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="oklch(0.52 0.22 264)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="oklch(0.52 0.22 264)" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="currentColor"
                    strokeOpacity={0.07}
                  />
                  <XAxis
                    dataKey="hour"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 500, fill: 'currentColor', opacity: 0.45 }}
                    dy={8}
                    interval={2}
                  />
                  <YAxis hide />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="oklch(0.52 0.22 264)"
                    strokeWidth={2}
                    fill="url(#volumeGrad)"
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0, fill: 'oklch(0.52 0.22 264)' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        {/* Right column: Complaints + SLA Widget */}
        <div className="space-y-5">
          {/* SLA Compliance */}
          <SlaWidget value={97.4} target={98.2} />

          {/* Complaints */}
          <SectionCard
            title="Critical Feedback"
            headerActions={
              <Link
                href="/complaints"
                className="text-primary text-[11px] font-semibold flex items-center gap-0.5 hover:underline underline-offset-2"
              >
                All <ChevronRight className="w-3 h-3" />
              </Link>
            }
          >
            <div className="space-y-3">
              {complaints.slice(0, 3).map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
