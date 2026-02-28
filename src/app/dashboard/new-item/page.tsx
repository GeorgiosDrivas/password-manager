import { redirect } from "next/navigation";
import NewItem from "@/components/newItem";
import { auth } from "../../../../auth";
import DashboardComponent from "@/components/dashboard";

export default async function NewItemPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <DashboardComponent>
      <NewItem userId={session.user.id} />
    </DashboardComponent>
  );
}
