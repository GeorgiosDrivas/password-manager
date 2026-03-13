'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search as SearchIcon, ChevronRight, Shield, Plus, LucideIcon } from 'lucide-react';
import { Input } from '@/shared/ui/primitives/input';
import { Button } from '@/shared/ui/primitives/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/primitives/tooltip';
import { NavItem } from '@/shared/types/item';
import { Route } from 'next';

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Plus,
};

type Props = {
  navItems: NavItem[];
};

export default function SearchComponent({ navItems }: Props) {
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    const query = search.toLowerCase();
    return navItems.filter((item) => item.label.toLowerCase().includes(query));
  }, [navItems, search]);

  return (
    <>
      <div className="px-4 py-4">
        <div className="relative">
          <SearchIcon className="absolute right-3 top-3 h-4 w-4 text-emerald-500" />
          <Input
            placeholder="Search passwords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-4 pr-10 py-2 dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900/40 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl transition-all"
          />
        </div>
      </div>

      <div className="flex-1 px-3 py-2 space-y-6 overflow-y-auto">
        <div className="space-y-2">
          <p className="px-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
            Vault
          </p>

          {filteredItems.length === 0 && (
            <p className="text-xs text-muted-foreground px-3">No passwords found</p>
          )}

          {filteredItems.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href as Route}>
                    <Button
                      variant="ghost"
                      className="cursor-pointer w-full justify-start gap-3 h-11 px-3 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all group rounded-xl"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                        {Icon && <Icon className="w-4 h-4" />}
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                      <ChevronRight className="w-4 h-4 ml-auto text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="hidden lg:block">
                  {item.description}
                </TooltipContent>
              </Tooltip>
            );
          })}
          <Tooltip key="/dashboard/new-item">
            <TooltipTrigger asChild>
              <Link href="/dashboard/new-item">
                <Button
                  variant="ghost"
                  className="cursor-pointer w-full justify-start gap-3 h-11 px-3 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all group rounded-xl"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">Add New</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="hidden lg:block">
              Create password
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
