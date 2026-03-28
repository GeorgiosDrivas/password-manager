import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { auth } from '@core/auth';
import { prisma } from '@/shared/lib/prisma';

import { Button } from '@/shared/ui/primitives/button';
import { Avatar, AvatarFallback } from '@/shared/ui/primitives/avatar';
import { Badge } from '@/shared/ui/primitives/badge';
import { TooltipProvider } from '@/shared/ui/primitives/tooltip';

import { Plus, Shield, LogOut } from 'lucide-react';
import { NavItem } from '@/shared/types/item.types';

import SearchComponent from '@/shared/ui/searchComponent';
import { MobileNav } from '@/widgets/mobileNav';

export default async function DashboardComponent({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session) redirect('/');

  const userId = parseInt(session.user.id);

  const items = await prisma.item.findMany({
    where: { userId },
  });

  const userInitials =
    session.user?.name
      ?.split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase() ?? 'U';

  const navItems: NavItem[] = items.map((item) => ({
    href: `/dashboard/items/${item.id}`,
    icon: 'Shield',
    label: item.title,
    description: 'Saved password',
  }));

  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-screen flex bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* ── Desktop sidebar — hidden on mobile ── */}
        <aside className="hidden lg:flex w-72 border-r border-emerald-100 dark:border-emerald-900/30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl flex-col h-screen sticky top-0 shrink-0">
          <div className="p-6 border-b border-emerald-100 dark:border-emerald-900/30">
            <Link href="/dashboard">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg text-slate-900 dark:text-white">PassVault</h1>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">Secure Storage</p>
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-3 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
              <Avatar className="h-10 w-10 border-2 border-emerald-500/30 shrink-0">
                <AvatarFallback className="bg-emerald-500 text-white font-semibold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate text-slate-800 dark:text-slate-200">
                  {session.user?.name}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 truncate">
                  {session.user?.email}
                </p>
              </div>
            </div>
          </div>

          <SearchComponent navItems={navItems} />

          <div className="p-3 border-t border-emerald-100 dark:border-emerald-900/30 mt-auto">
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

        {/* ── Main content ── */}
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-emerald-100 dark:border-emerald-900/30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/*
               * MobileNav renders the hamburger trigger + the fixed slide-over drawer
               * as a single client component with shared state. It's placed here in
               * the header so the trigger button sits at the start of the header row.
               * The drawer itself escapes layout flow via `position: fixed`.
               */}
              <MobileNav
                userInitials={userInitials}
                userName={session.user?.name}
                userEmail={session.user?.email}
                navItems={navItems}
              />

              <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white truncate">
                Passwords
              </h2>

              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-0 shrink-0">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </Badge>
            </div>

            {/* Desktop "Add new" button */}
            <Button
              size="sm"
              className="hidden lg:flex bg-linear-to-r from-emerald-500 to-teal-600 text-white shadow-lg items-center gap-2 shrink-0"
            >
              <Link href="/dashboard/new-item" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add new
              </Link>
            </Button>

            {/* Mobile "Add new" — icon-only button to save header space */}
            <Button
              size="icon"
              className="lg:hidden h-9 w-9 bg-linear-to-r from-emerald-500 to-teal-600 text-white shadow-lg rounded-xl shrink-0"
              aria-label="Add new password"
              asChild
            >
              <Link href="/dashboard/new-item">
                <Plus className="w-4 h-4" />
              </Link>
            </Button>
          </header>

          <div className="flex-1 p-4 sm:p-6 overflow-auto">
            <div className="max-w-5xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
