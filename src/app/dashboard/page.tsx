import { auth } from "@/auth";
import Search from "@/src/components/Search";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Settings, List, CirclePlus } from "lucide-react";

export default async function Dashboard({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <section id="dashboard" className="grid grid-cols-8 h-screen pt-4">
      <div id="settings-panel" className="col-span-2 ps-3">
        <h1 className="pb-5 rubik-head-medium">{session.user?.name}</h1>
        <Search />
        <ul>
          <li>
            <List className="w-5 h-5" />
            <Link href="/dashboard/items">Passwords</Link>
          </li>
          <li>
            <CirclePlus className="w-5 h-5" />
            <Link href="/dashboard/new-item">New password</Link>
          </li>
        </ul>
        <hr />
        <ul>
          <li>
            <Settings className="w-5 h-5" />
            <Link href="/dashboard/settings">Settings</Link>
          </li>
        </ul>
      </div>
      <div id="items-panel" className="col-span-6">
        {children}
      </div>
    </section>
  );
}
