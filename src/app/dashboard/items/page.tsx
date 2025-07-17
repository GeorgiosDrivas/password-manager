import { redirect } from "next/navigation";
import Dashboard from "../page";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth/next";

export default async function Items() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Dashboard>
        <h2>Items</h2>
      </Dashboard>
    </>
  );
}
