"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Search, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

const PAGE_TITLES: Record<string, string> = {
  '':              'Overview',
  'orders':        'Live Orders',
  'floormap':      'Store Map',
  'inventory':     'Inventory',
  'pricing':       'Pricing',
  'pl':            'P&L / Finance',
  'returns':       'Returns',
  'sla':           'SLA Breaches',
  'complaints':    'Complaints',
  'grn':           'GRN / Inward',
  'forecast':      'Demand Forecast',
  'handover':      'Shift Handover',
  'incoming-stock':'Incoming Stock',
  'stock-handover':'Stock Handover',
};

export const Topbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const segment = pathname.split('/').filter(Boolean)[0] ?? '';
  const pageTitle = PAGE_TITLES[segment] ?? 'ClickOn Admin';

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Left: Page title + Search */}
      <div className="flex items-center gap-5">
        <h1 className="font-semibold text-base text-foreground tracking-tight">
          {pageTitle}
        </h1>

        <div className={cn(
          "hidden md:flex items-center gap-2 bg-muted border border-border rounded-lg px-3 py-1.5 w-60",
          "transition-all duration-150",
          "focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40"
        )}>
          <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search orders, SKUs…"
            className="bg-transparent border-none focus:outline-none text-[13px] w-full text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-150"
        >
          {theme === 'dark'
            ? <Sun className="w-4 h-4" />
            : <Moon className="w-4 h-4" />
          }
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-150 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-destructive rounded-full" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-border mx-1" />

        {/* User */}
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-accent transition-all duration-150 cursor-pointer group">
          <div className="hidden sm:block text-right">
            <div className="text-[12px] font-semibold text-foreground leading-tight">Amit M.</div>
            <div className="text-[10px] font-medium text-primary uppercase tracking-wider">Manager</div>
          </div>
          <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-semibold text-[11px]">
            AM
          </div>
        </div>
      </div>
    </header>
  );
};
