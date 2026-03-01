import { redirect } from "next/navigation";
import { auth } from "@core/auth";
import SelectedItem from "@/components/selectedItem";
import { prisma } from "@/lib/prisma";
import DashboardComponent from "@/components/dashboard";

export default async function ItemPage({ params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const item = await prisma.item.findUnique({
    where: { id: Number(params.id), userId: Number(session.user.id) },
  });

  if (!item) {
    redirect("/dashboard");
  }

  return (
    <DashboardComponent>
      <SelectedItem item={item} />
    </DashboardComponent>
  );
}
