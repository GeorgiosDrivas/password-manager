import { redirect } from "next/navigation";
import NewItem from "../../../components/newItem";
import Dashboard from "../page";
import { auth } from "@/auth";

export default async function NewItemPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <Dashboard>
      <NewItem userId={session.user.id} />;
    </Dashboard>
  );
}
