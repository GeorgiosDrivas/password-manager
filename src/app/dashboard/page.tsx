import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import DashboardComponent from "@/components/dashboard";

export default async function Items() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <DashboardComponent>1</DashboardComponent>
    </>
  );
}
