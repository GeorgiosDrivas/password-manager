import { redirect } from "next/navigation";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/src/lib/prisma";
import ItemsList from "../../../components/ItemsList";
import Dashboard from "../page";

export default async function Items() {
  const session = await getServerSession(authOptions);
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
