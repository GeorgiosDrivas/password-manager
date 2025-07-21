import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Dashboard({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <section id="dashboard" className="grid grid-cols-8 h-screen pt-4">
      <div id="settings-panel" className="col-span-2 ps-3">
        <h1 className="pb-5 text-xl">{session.user?.name}</h1>
        <ul>
          <li>
            <Link href="/dashboard/items">Items</Link>
          </li>
          <li>
            <Link href="/dashboard/new-item">New item</Link>
          </li>
        </ul>
        <ul>
          <li>About</li>
          <li>Settings</li>
        </ul>
      </div>
      <div id="items-panel" className="col-span-6">
        {children}
      </div>
    </section>
  );
}
