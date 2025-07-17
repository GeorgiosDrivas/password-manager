import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  console.log(session);

  return (
    <div>
      <p>Welcome, {session.user?.name}</p>
    </div>
  );
}
