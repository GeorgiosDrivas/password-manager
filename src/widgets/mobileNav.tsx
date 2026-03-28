'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Button } from '@/shared/ui/primitives/button';
import { Avatar, AvatarFallback } from '@/shared/ui/primitives/avatar';
import { Shield, LogOut, Menu, X, Plus } from 'lucide-react';
import { NavItem } from '@/shared/types/item.types';
import SearchComponent from '@/shared/ui/searchComponent';

interface MobileNavProps {
  userInitials: string;
  userName?: string | null;
  userEmail?: string | null;
  navItems: NavItem[];
}

export function MobileNav({ userInitials, userName, userEmail, navItems }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <Menu className="w-5 h-5" />
      </button>
      {typeof document !== 'undefined' &&
        createPortal(
          <>
            <div
              aria-hidden="true"
              onClick={() => setOpen(false)}
              className={`
              fixed inset-0 z-[200] bg-slate-900/50 backdrop-blur-sm
              transition-opacity duration-300
              ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `}
            />

            <aside
              aria-label="Mobile navigation"
              className={`
              fixed inset-y-0 left-0 z-[210] w-72
              flex flex-col
              border-r border-emerald-100 dark:border-emerald-900/30
              bg-white dark:bg-slate-900
              transition-transform duration-300 ease-in-out
              ${open ? 'translate-x-0' : '-translate-x-full'}
            `}
            >
              <div className="p-6 border-b border-emerald-100 dark:border-emerald-900/30 shrink-0">
                <div className="flex items-center justify-between mb-6">
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h1 className="font-bold text-lg text-slate-900 dark:text-white">
                          PassVault
                        </h1>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">
                          Secure Storage
                        </p>
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                  <Avatar className="h-10 w-10 border-2 border-emerald-500/30 shrink-0">
                    <AvatarFallback className="bg-emerald-500 text-white font-semibold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate text-slate-800 dark:text-slate-200">
                      {userName}
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 truncate">
                      {userEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto" onClick={() => setOpen(false)}>
                <SearchComponent navItems={navItems} />
              </div>

              <div className="p-3 border-t border-emerald-100 dark:border-emerald-900/30 space-y-1 shrink-0">
                <Button
                  size="sm"
                  className="w-full bg-linear-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                  onClick={() => setOpen(false)}
                >
                  <Link
                    href="/dashboard/new-item"
                    className="flex items-center justify-center gap-2 w-full"
                  >
                    <Plus className="w-4 h-4" />
                    Add new password
                  </Link>
                </Button>

                <form action="/api/auth/signout" method="POST">
                  <Button
                    type="submit"
                    variant="ghost"
                    className="w-full justify-start gap-3 h-11 px-3 cursor-pointer text-red-600 hover:bg-red-100 dark:hover:bg-red-950/30 transition-all rounded-xl"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Sign out</span>
                  </Button>
                </form>
              </div>
            </aside>
          </>,
          document.body
        )}
    </>
  );
}
