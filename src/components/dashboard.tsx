import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { auth } from "../../auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Plus,
  Search as SearchIcon,
  Shield,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function DashboardComponent({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/");

  const userId = Number(session.user.id);

  const itemsList = await prisma.item.findMany({
    where: { userId },
  });

  const userInitials =
    session.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  const navItems = [
    ...itemsList.map((item: any) => ({
      href: `/dashboard/items/${item.id}` as const,
      icon: Shield,
      label: item.title,
      description: "Saved password",
    })),
    {
      href: "/dashboard/new-item" as const,
      icon: Plus,
      label: "Add New",
      description: "Create password",
    },
  ] as const;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <aside className="w-72 border-r border-emerald-100 dark:border-emerald-900/30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl flex flex-col h-screen sticky top-0">
          <div className="p-6 border-b border-emerald-100 dark:border-emerald-900/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
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

            <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
              <Avatar className="h-10 w-10 border-2 border-emerald-500/30">
                <AvatarFallback className="bg-emerald-500 text-white font-semibold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-slate-800 dark:text-slate-200">
                  {session.user?.name}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 truncate">
                  {session.user?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="px-4 py-4">
            <div className="relative">
              <SearchIcon className="absolute right-3 top-3 h-4 w-4 text-emerald-500" />
              <Input
                placeholder="Search passwords..."
                className="pl-4 pr-10 py-2 dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900/40 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl transition-all"
              />
            </div>
          </div>

          <div className="flex-1 px-3 py-2 space-y-6 overflow-y-auto">
            <div className="space-y-2">
              <p className="px-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                Vault
              </p>

              {navItems.map((item) => (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link href={item.href}>
                      <Button
                        variant="ghost"
                        className="w-full cursor-pointer justify-start gap-3 h-11 px-3 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all group rounded-xl"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-all">
                          <item.icon className="w-4 h-4" />
                        </div>

                        <span className="text-sm font-medium">
                          {item.label}
                        </span>

                        <ChevronRight className="w-4 h-4 ml-auto text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="hidden lg:block">
                    {item.description}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          <div className="p-3 border-t border-emerald-100 dark:border-emerald-900/30 mt-auto">
            <form action="/api/auth/signout" method="POST">
              <Button
                type="submit"
                variant="ghost"
                className="w-full justify-start gap-3 h-11 px-3 cursor-pointer text-red-600 dark:text-emerald-400 hover:bg-red-100 dark:hover:bg-emerald-900/30 transition-all rounded-xl"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg">
                  <LogOut className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Sign out</span>
              </Button>
            </form>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-emerald-100 dark:border-emerald-900/30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Passwords
              </h2>
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-0">
                12 items
              </Badge>
            </div>

            <Button
              size="sm"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
            >
              <Link
                href="/dashboard/new-item"
                className="gap-2 flex items-center"
              >
                <Plus className="w-4 h-4" />
                Add new
              </Link>
            </Button>
          </header>

          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-5xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
