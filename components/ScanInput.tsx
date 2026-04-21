"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Scan, Command, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';

interface ScanInputProps {
  onScan: (sku: string) => void;
  isLoading?: boolean;
  error?: string | null;
  success?: string | null;
  placeholder?: string;
}

export const ScanInput: React.FC<ScanInputProps> = ({ 
  onScan, 
  isLoading, 
  error, 
  success, 
  placeholder = "Scan SKU or type manually..." 
}) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onScan(value.trim());
      setValue("");
    }
  };

  // Keyboard shortcut to focus input (Cmd/Ctrl + K like a spotlight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="relative group">
        <div className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200",
          isFocused ? "text-[#1D9E75]" : "text-slate-400"
        )}>
          {isLoading ? (
            <div className="w-4 h-4 rounded-full border-2 border-slate-200 border-t-[#1D9E75] animate-spin" />
          ) : (
            <Scan className="w-5 h-5" />
          )}
        </div>
        
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            "pl-12 h-14 bg-white border-2 rounded-2xl text-base transition-all duration-300 shadow-lg shadow-slate-100/50",
            isFocused ? "border-[#1D9E75] ring-4 ring-[#1D9E75]/5 w-full scale-[1.01]" : "border-slate-100 w-full",
            error && "border-rose-500 ring-rose-500/10",
            success && "border-emerald-500 ring-emerald-500/10"
          )}
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-black text-slate-400">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
          <button 
            type="submit"
            className={cn(
              "p-2 rounded-xl transition-all",
              value.trim() ? "bg-[#1D9E75] text-white shadow-md shadow-[#1D9E75]/20" : "bg-slate-50 text-slate-300"
            )}
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>

      <div className="h-6 overflow-hidden">
        {error && (
          <div className="flex items-center gap-2 text-rose-600 animate-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-tight">{error}</span>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 text-emerald-600 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-tight">{success}</span>
          </div>
        )}
      </div>
    </div>
  );
};
