"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_DATA, Zone, InventoryItem } from '@/lib/mockData';
import { SectionCard } from '@/components/SectionCard';
import { StatusPill } from '@/components/StatusPill';
import { Map as MapIcon, BarChart3, Info, Package, Clock, AlertTriangle, User } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Table, Column } from '@/components/Table';
import { cn } from '@/lib/utils';

export default function FloorMapPage() {
  const { zones, inventory } = MOCK_DATA;
  const searchParams = useSearchParams();
  const highlightedBinParam = searchParams.get('bin');
  
  const [selectedBin, setSelectedBin] = useState<{ zone: string, bin: string, products: string[], status: string } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Effect to handle deep linking to a specific bin
  useEffect(() => {
    if (highlightedBinParam) {
      for (const zone of zones) {
        const bin = zone.bins.find(b => b.lbl === highlightedBinParam);
        if (bin) {
          setSelectedBin({ zone: zone.name, bin: bin.lbl, products: bin.products, status: bin.status });
          setIsDialogOpen(true);
          break;
        }
      }
    }
  }, [highlightedBinParam, zones]);

  const getBinProducts = (skus: string[]) => {
    return inventory.filter(item => skus.includes(item.id));
  };

  const columns: Column<InventoryItem>[] = [
    { 
      header: "Product", 
      accessor: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
            <Package className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[13px] font-bold text-slate-900 leading-tight">{item.name}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.id}</div>
          </div>
        </div>
      )
    },
    { 
      header: "Stock", 
      accessor: (item) => (
        <div className="flex flex-col">
          <span className={cn("font-bold", item.status === 'critical' ? 'text-rose-600' : 'text-slate-900')}>{item.stock} units</span>
          <div className="w-16 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
            <div 
              className={cn("h-full", item.status === 'critical' ? 'bg-rose-500' : 'bg-emerald-500')} 
              style={{ width: `${(item.stock / item.max) * 100}%` }} 
            />
          </div>
        </div>
      )
    },
    { 
      header: "Expiry", 
      accessor: (item) => (
        <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[12px]">
          <Clock className="w-3.5 h-3.5" />
          {item.expiry}
        </div>
      )
    },
    { header: "Supplier", accessor: "supplier", className: "text-slate-400" }
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Interactive Map</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Real-time bin status and product drill-down</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-200 rounded-2xl px-5 py-3 bg-white shadow-sm">
          <div className="flex items-center gap-2 pr-3 border-r border-slate-100">
            <div className="w-2.5 h-2.5 bg-emerald-100 border border-emerald-300 rounded-full" /> Stocked
          </div>
          <div className="flex items-center gap-2 px-3 border-r border-slate-100">
            <div className="w-2.5 h-2.5 bg-amber-100 border border-amber-300 rounded-full" /> Low
          </div>
          <div className="flex items-center gap-2 px-3 border-r border-slate-100">
            <div className="w-2.5 h-2.5 bg-rose-100 border border-rose-300 rounded-full" /> Empty
          </div>
          <div className="flex items-center gap-2 pl-3">
            <div className="w-2.5 h-2.5 bg-blue-500 border border-blue-600 rounded-full" /> Picker
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Map Grid */}
        <div className="lg:col-span-8 space-y-6">
          {zones.map((zone, idx) => (
            <SectionCard key={idx} title={zone.name}>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 pt-4">
                {zone.bins.map((bin, bIdx) => {
                  const isHighlighted = bin.lbl === highlightedBinParam;
                  const statusStyles: Record<string, string> = {
                    stocked: "bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100 hover:scale-105 active:scale-95",
                    low: "bg-amber-50 border-amber-100 text-amber-700 hover:bg-amber-100 hover:scale-105 active:scale-95",
                    empty: "bg-rose-50 border-rose-100 text-rose-700 hover:bg-rose-100 animate-pulse hover:scale-105 active:scale-95",
                    picker: "bg-blue-500 border-blue-600 text-white shadow-xl shadow-blue-500/20 scale-110 z-10"
                  };
                  
                  return (
                    <button 
                      key={bIdx}
                      onClick={() => {
                        setSelectedBin({ zone: zone.name, bin: bin.lbl, products: bin.products, status: bin.status });
                        setIsDialogOpen(true);
                      }}
                      className={cn(
                        "group aspect-square rounded-2xl border flex flex-col items-center justify-center transition-all duration-300 relative shadow-sm",
                        statusStyles[bin.status],
                        isHighlighted && "ring-4 ring-[#1D9E75] ring-offset-2 scale-110 shadow-lg shadow-[#1D9E75]/20 animate-bounce"
                      )}
                    >
                      <span className="text-xs font-black tracking-tight">{bin.lbl}</span>
                      <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Info className="w-2.5 h-2.5" />
                      </div>
                      {bin.status === 'picker' && (
                        <div className="absolute -top-3 -right-3 w-7 h-7 bg-white text-blue-600 rounded-xl border-2 border-blue-600 flex items-center justify-center text-[10px] font-black shadow-lg">
                          <User className="w-3.5 h-3.5 fill-current" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </SectionCard>
          ))}
        </div>

        {/* Stats Column */}
        <div className="lg:col-span-4 space-y-6">
          <SectionCard title="Zone Utilization">
            <div className="space-y-6 mt-4">
              {zones.map((zone, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{zone.name.split('—')[0]}</span>
                    <span className={cn(
                      "text-xs font-black",
                      zone.utilization > 80 ? 'text-rose-600' : 'text-emerald-600'
                    )}>{zone.utilization}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-50 rounded-full border border-slate-100 overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-1000",
                        zone.utilization > 80 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : 'bg-[#1D9E75]'
                      )}
                      style={{ width: `${zone.utilization}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
          
          <SectionCard title="Personnel on Floor">
            <div className="space-y-4 pt-2">
              {[
                { name: 'Divya S.', role: 'Picking', loc: 'A4', color: 'emerald' },
                { name: 'Ravi K.', role: 'Restocking', loc: 'B4', color: 'blue' },
                { name: 'Lakshmi R.', role: 'Auditing', loc: 'C3', color: 'amber' }
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-200 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center font-black text-[11px] text-slate-400 group-hover:text-[#1D9E75] group-hover:border-[#1D9E75]/30 transition-all">
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-[13px] font-black text-slate-800">{p.name}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">{p.role} · <span className="text-[#1D9E75]">{p.loc}</span></div>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Controlled Dialog for viewing a bin */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedBin && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center border-2",
                    selectedBin.status === 'empty' ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-[#1D9E75]/10 border-[#1D9E75]/20 text-[#1D9E75]'
                  )}>
                    <MapIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Location {selectedBin.bin}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{selectedBin.zone.split('—')[0]}</p>
                  </div>
                </div>
                <StatusPill status={selectedBin.status} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Stored Products</h4>
                  <span className="text-[10px] font-bold text-[#1D9E75] bg-[#1D9E75]/10 px-2 py-0.5 rounded-lg">{selectedBin.products.length} Items</span>
                </div>
                
                <Table columns={columns} data={getBinProducts(selectedBin.products)} />
                
                {selectedBin.products.length === 0 && (
                  <div className="py-12 border-2 border-dashed border-slate-100 rounded-3xl text-center space-y-3">
                    <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-900">Bin is currently empty</p>
                      <p className="text-xs text-slate-400 font-medium">Add products to this location via Stock Handover</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
