import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import NewItemClient from "./newItemClient";
import Dashboard from "../page";

export default async function NewItemPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <Dashboard>
      <NewItemClient userId={session.user.id} />;
    </Dashboard>
  );
}
