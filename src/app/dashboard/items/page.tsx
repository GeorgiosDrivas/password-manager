import { redirect } from "next/navigation";
import Dashboard from "../page";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/src/lib/prisma";

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
        <h2>Items</h2>
        <div id="items-list">
          {data &&
            data.map((item) => (
              <div key={item.id}>
                <p>{item.title}</p>
                <p>{item.url}</p>
              </div>
            ))}
        </div>
      </Dashboard>
    </>
  );
}
