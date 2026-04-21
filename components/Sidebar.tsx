"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  Map as MapIcon,
  Package,
  PackagePlus,
  IndianRupee,
  TrendingUp,
  RefreshCcw,
  AlertCircle,
  MessageSquare,
  ClipboardList,
  LineChart,
  History,
  Truck,
  Scan,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

interface NavGroup {
  label: string;
  color: string;          // Active accent color (Tailwind class fragment)
  activeBg: string;       // Active bg class
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Operations',
    color: 'text-indigo-600 dark:text-indigo-400',
    activeBg: 'bg-indigo-50 dark:bg-indigo-500/15',
    items: [
      { label: 'Overview',    href: '/',             icon: LayoutDashboard },
      { label: 'Live Orders', href: '/orders',       icon: ShoppingCart },
      { label: 'Store Map',   href: '/floormap',     icon: MapIcon },
      { label: 'Inventory',   href: '/inventory',    icon: Package },
      { label: 'Add Product', href: '/inventory/add',icon: PackagePlus },
    ],
  },
  {
    label: 'Finance',
    color: 'text-emerald-600 dark:text-emerald-400',
    activeBg: 'bg-emerald-50 dark:bg-emerald-500/15',
    items: [
      { label: 'Pricing', href: '/pricing', icon: IndianRupee },
      { label: 'P&L',     href: '/pl',     icon: TrendingUp },
    ],
  },
  {
    label: 'Quality',
    color: 'text-rose-600 dark:text-rose-400',
    activeBg: 'bg-rose-50 dark:bg-rose-500/15',
    items: [
      { label: 'Returns',     href: '/returns',    icon: RefreshCcw,   badge: '5' },
      { label: 'SLA Breaches',href: '/sla',        icon: AlertCircle,  badge: '3' },
      { label: 'Complaints',  href: '/complaints', icon: MessageSquare,badge: '4' },
    ],
  },
  {
    label: 'Supply & Admin',
    color: 'text-amber-600 dark:text-amber-400',
    activeBg: 'bg-amber-50 dark:bg-amber-500/15',
    items: [
      { label: 'GRN / Inward',    href: '/grn',           icon: ClipboardList },
      { label: 'Incoming Stock',  href: '/incoming-stock', icon: Truck },
      { label: 'Stock Handover',  href: '/stock-handover', icon: Scan },
      { label: 'Demand Forecast', href: '/forecast',       icon: LineChart },
      { label: 'Shift Handover',  href: '/handover',       icon: History },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen fixed left-0 top-0 z-20 overflow-y-auto">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-primary-foreground text-sm font-bold shadow-sm">
            C
          </div>
          <span className="font-semibold text-lg tracking-tight text-sidebar-foreground">
            click<span className="text-primary">on</span>
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-6 mt-1 overflow-y-auto">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            {/* Group Label */}
            <div className={cn(
              'px-3 text-[10px] uppercase font-semibold tracking-widest mb-1.5',
              'text-muted-foreground/60'
            )}>
              {group.label}
            </div>

            {/* Nav Items */}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 group',
                      isActive
                        ? cn(group.activeBg, group.color, 'font-semibold')
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={cn(
                          'w-4 h-4 shrink-0 transition-colors duration-150',
                          isActive
                            ? group.color.split(' ')[0]  // use only light mode color class to avoid duplication
                            : 'text-muted-foreground/50 group-hover:text-muted-foreground'
                        )}
                      />
                      {item.label}
                    </div>

                    {item.badge && (
                      <span className={cn(
                        'px-1.5 py-0.5 rounded-md text-[10px] font-semibold tabular-nums',
                        isActive
                          ? 'bg-white/60 dark:bg-black/20'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Store Info Footer */}
      <div className="p-3 border-t border-sidebar-border shrink-0">
        <div className="px-3 py-2.5 rounded-lg bg-muted/40">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[12px] font-semibold text-foreground">HSR Layout, Blr</span>
          </div>
          <div className="text-[11px] text-muted-foreground pl-3.5">Dark Store #221 · Live</div>
        </div>
      </div>
    </aside>
  );
};
