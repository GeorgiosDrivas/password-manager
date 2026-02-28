import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import DashboardComponent from "@/components/dashboard";
import { prisma } from "@/lib/prisma";
import PasswordTable from "@/components/passwordTable";

export default async function Items() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const items = await prisma.item.findMany({
    where: { userId: Number(session.user.id) },
    orderBy: { id: "desc" },
  });

  return (
    <DashboardComponent>
      <PasswordTable items={items} />
    </DashboardComponent>
  );
}
