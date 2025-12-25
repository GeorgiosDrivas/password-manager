import { redirect } from "next/navigation";
import ItemsList from "../../../components/ItemsList";
import Dashboard from "../page";
import { auth } from "@/auth";
import { prisma } from "@/src/lib/prisma";

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
      <Dashboard>
        <ItemsList data={data} />
      </Dashboard>
    </>
  );
}
