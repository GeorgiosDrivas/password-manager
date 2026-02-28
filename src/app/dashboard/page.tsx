import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { prisma } from "@/lib/prisma";
import DashboardComponent from "@/components/dashboard";

export default async function Items() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const userId = Number(session.user.id);
  const data = await prisma.item.findMany({
    where: { userId },
  });

  return (
    <>
      <DashboardComponent>
        <div>Your dashboard content</div>
      </DashboardComponent>
    </>
  );
}
