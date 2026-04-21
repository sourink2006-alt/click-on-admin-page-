import React from 'react';
import { AddProductForm } from '@/components/AddProductForm';
import { ChevronRight, PackagePlus } from 'lucide-react';
import Link from 'next/link';

export default function AddProductPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            <Link href="/inventory" className="hover:text-slate-900 transition-colors">Inventory</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900">Add New Product</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1D9E75] flex items-center justify-center text-white shadow-lg shadow-[#1D9E75]/20">
              <PackagePlus className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Product</h1>
          </div>
          <p className="text-sm text-slate-500 font-medium pt-1">
            Fill in the details below to add a new product to your dark store catalog.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/inventory">
            <button className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-all">
              Discard Draft
            </button>
          </Link>
        </div>
      </div>

      {/* Form Content */}
      <AddProductForm />
    </div>
  );
}
