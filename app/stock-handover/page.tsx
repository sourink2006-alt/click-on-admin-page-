"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MOCK_DATA, HandoverBatch } from '@/lib/mockData';
import { BatchSummaryCard } from '@/components/BatchSummaryCard';
import { ConsignmentTable } from '@/components/ConsignmentTable';
import { MetricCard } from '@/components/MetricCard';
import { 
  Play, 
  Pause, 
  CheckCheck, 
  AlertCircle, 
  History, 
  Settings2,
  TrendingUp,
  Inbox
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StockHandoverPage() {
  const [batches, setBatches] = useState<HandoverBatch[]>(MOCK_DATA.handoverBatches);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(batches[0]?.id || null);
  const [isSimulating, setIsSimulating] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const selectedBatch = batches.find(b => b.id === selectedBatchId);
  const activeBatches = batches.filter(b => b.status === 'in progress').length;
  const pendingBatches = batches.filter(b => b.status === 'pending').length;

  // Simulation Logic: Increment processed items semi-randomly
  useEffect(() => {
    if (!isSimulating) return;

    const timer = setInterval(() => {
      setBatches(prev => prev.map(batch => {
        // Only process "in progress" batches or "pending" if they are the first ones
        if (batch.status === 'completed') return batch;
        
        // Randomly decide if this batch gets an update this tick
        if (Math.random() > 0.4) return batch;

        const newProducts = batch.products.map(p => {
          if (p.processed < p.delivered && Math.random() > 0.5) {
            return { ...p, processed: p.processed + 1 };
          }
          return p;
        });

        const newProcessedCount = newProducts.reduce((acc, p) => acc + p.processed, 0);
        
        let newStatus: HandoverBatch['status'] = 'in progress';
        if (newProcessedCount === batch.totalItems) newStatus = 'completed';
        else if (newProcessedCount === 0) newStatus = 'pending';

        setLastUpdate(newDate => new Date());
        
        return {
          ...batch,
          products: newProducts,
          processedItems: newProcessedCount,
          status: newStatus
        };
      }));
    }, 2500); // Pulse every 2.5s

    return () => clearInterval(timer);
  }, [isSimulating]);

  const handleUpdateLocation = (sku: string, location: string) => {
    setBatches(prev => prev.map(batch => {
      if (batch.id !== selectedBatchId) return batch;
      return {
        ...batch,
        products: batch.products.map(p => 
          p.sku === sku ? { ...p, location } : p
        )
      };
    }));
  };

  const handleManualComplete = () => {
    if (!selectedBatchId) return;
    setBatches(prev => prev.map(batch => {
      if (batch.id !== selectedBatchId) return batch;
      return {
        ...batch,
        status: 'completed',
        processedItems: batch.totalItems,
        products: batch.products.map(p => ({ ...p, processed: p.delivered }))
      };
    }));
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Stock Handover Control</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1D9E75]/10 rounded-lg text-[10px] font-black text-[#1D9E75] uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full animate-pulse" />
              Live Monitoring Active
            </div>
            {lastUpdate && (
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                Last Event: {lastUpdate.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setIsSimulating(!isSimulating)}
            className={cn(
              "h-12 px-6 rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-widest transition-all",
              isSimulating 
                ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600" 
                : "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600"
            )}
          >
            {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isSimulating ? "Pause Simulation" : "Resume Simulation"}
          </button>
          
          <button 
            onClick={handleManualComplete}
            disabled={selectedBatch?.status === 'completed'}
            className="h-12 px-6 rounded-2xl bg-slate-900 text-white flex items-center gap-3 font-black text-xs uppercase tracking-widest hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-900/10"
          >
            <CheckCheck className="w-4 h-4" />
            Manual Complete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard label="Active Inwarding" value={activeBatches} icon={TrendingUp} color="emerald" />
        <MetricCard label="Pending Handovers" value={pendingBatches} icon={History} color="amber" />
        <MetricCard label="Completion Rate" value="94.2%" subtext="+2.1% from avg" trend="up" trendValue="2.1" icon={CheckCheck} color="indigo" />
        <MetricCard label="Total Consignments" value={batches.length} icon={Inbox} color="slate" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Arrivals to Process */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Arrivals to Process</h3>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg">
              {batches.length} Consignments
            </span>
          </div>
          
          <div className="space-y-4">
            {batches.map(batch => (
              <BatchSummaryCard 
                key={batch.id} 
                batch={batch} 
                isActive={selectedBatchId === batch.id}
                onClick={() => setSelectedBatchId(batch.id)}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Consignment Detail */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Consignment Contents</h3>
              {selectedBatch && (
                <div className="px-2 py-0.5 bg-slate-100 rounded-lg text-[10px] font-black text-slate-500 uppercase">
                  {selectedBatch.id}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 border-b border-transparent hover:border-slate-900 transition-all uppercase tracking-widest">
                Print Labels
              </button>
              <div className="w-1 h-1 rounded-full bg-slate-200" />
              <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 border-b border-transparent hover:border-slate-900 transition-all uppercase tracking-widest">
                Report Discrepancy
              </button>
            </div>
          </div>

          <ConsignmentTable 
            products={selectedBatch?.products || []} 
            onUpdateLocation={handleUpdateLocation}
          />

          {/* Logic Summary / Alerts */}
          {selectedBatch?.status === 'in progress' && (
            <div className="p-6 rounded-[2rem] bg-emerald-50 border border-emerald-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Settings2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-emerald-900 uppercase tracking-tight">Active Picker Session</p>
                <p className="text-xs text-emerald-700 font-bold leading-relaxed">
                  Real-time scan events are being received from the warehouse app. Quantities will automatically increment as items are assigned to racks.
                </p>
              </div>
            </div>
          )}

          {selectedBatch?.status === 'pending' && (
            <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Consignment Pending</p>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">
                  The darkstore picker has not yet started the scanning session for this batch. All quantities remain at 0.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
