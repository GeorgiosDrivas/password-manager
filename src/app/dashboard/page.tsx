import AboutSvg from "@/src/components/svgs/aboutSvg";
import ListSvg from "@/src/components/svgs/listSvg";
import NewItemSvg from "@/src/components/svgs/newItemSvg";
import SettingsSvg from "@/src/components/svgs/settingsSvg";
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
        <h1 className="pb-5 rubik-head-medium">{session.user?.name}</h1>
        <ul>
          <li>
            <ListSvg />
            <Link href="/dashboard/items">Passwords</Link>
          </li>
          <li>
            <NewItemSvg />
            <Link href="/dashboard/new-item">New password</Link>
          </li>
        </ul>
        <hr />
        <ul>
          <li>
            <AboutSvg />
            About
          </li>
          <li>
            <SettingsSvg />
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
