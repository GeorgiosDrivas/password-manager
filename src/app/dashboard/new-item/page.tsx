import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import NewItem from "../../../components/newItem";
import Dashboard from "../page";

export default async function NewItemPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <Dashboard>
      <NewItem userId={session.user.id} />;
    </Dashboard>
  );
}
