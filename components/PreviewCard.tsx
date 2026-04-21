"use client";

import React from 'react';
import { Smartphone, ShoppingBag, Star, Clock } from 'lucide-react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface PreviewData {
  name: string;
  price: string;
  discount: string;
  shortDescription: string;
  image: string;
  category: string;
}

export const PreviewCard: React.FC<{ data: PreviewData }> = ({ data }) => {
  const finalPrice = parseFloat(data.price) || 0;
  const discountVal = parseFloat(data.discount) || 0;
  const originalPrice = discountVal > 0 ? finalPrice / (1 - discountVal / 100) : finalPrice;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 px-1">
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
          <Smartphone className="w-4 h-4 text-slate-500" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Mobile App Preview</h3>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">How customers see it</p>
        </div>
      </div>

      <div className="relative w-full max-w-[280px] mx-auto aspect-[9/16] bg-slate-100 rounded-[3rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-b-2xl z-10" />
        
        {/* Status Bar */}
        <div className="h-10 px-6 pt-2 flex justify-between items-center bg-white text-[10px] font-bold">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="w-3 h-2 border border-slate-400 rounded-sm" />
          </div>
        </div>

        <div className="flex-1 bg-slate-50 overflow-y-auto no-scrollbar pb-6">
          <div className="bg-white pb-4">
            {/* Image Placeholder */}
            <div className="aspect-square w-full bg-slate-100 relative group">
              {data.image ? (
                <img src={data.image} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-200 border-dashed">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tight">No image uploaded</span>
                </div>
              )}
              {discountVal > 0 && (
                <div className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">
                  {discountVal}% OFF
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-[#1D9E75] uppercase tracking-widest">{data.category || 'CATEGORY'}</span>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {data.name || 'Product Name Placeholder'}
                  </h4>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-[10px] font-bold">4.8</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-slate-900">₹{finalPrice.toLocaleString()}</span>
                {discountVal > 0 && (
                  <span className="text-[11px] text-slate-400 line-through font-medium">₹{Math.round(originalPrice).toLocaleString()}</span>
                )}
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
                {data.shortDescription || 'Add a short description to see it appear here in the live preview.'}
              </p>
            </div>
          </div>

          <div className="mt-2 px-4 space-y-3">
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-3 h-3" />
              <span className="text-[10px] font-medium">Delivery in 10-15 mins</span>
            </div>
            
            <button className="w-full bg-[#1D9E75] text-white py-3 rounded-xl text-xs font-black shadow-lg shadow-[#1D9E75]/20 flex items-center justify-center gap-2 border-b-4 border-[#167D5C] active:translate-y-1 active:border-b-0 transition-all">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#1D9E75]/10 flex items-center justify-center text-[#1D9E75]">
          <Star className="w-5 h-5 fill-current" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900 leading-tight">Instant Sync</p>
          <p className="text-[10px] text-slate-500 font-medium">Changes reflect in real-time as you type.</p>
        </div>
      </div>
    </div>
  );
};
