import { redirect } from "next/navigation";
import Dashboard from "../page";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/src/lib/prisma";
import Image from "next/image";

export default async function Items() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userId = Number(session.user.id);
  const data = await prisma.item.findMany({
    where: { userId },
  });

  const extractBaseDomain = (hostname: string) => {
    const parts = hostname.split(".");
    if (parts.length >= 2) {
      return parts.slice(-2).join("."); // "google.com"
    }
    return hostname;
  };

  const getUrlFavicon = (url: string) => {
    const hostname = new URL(url).hostname;
    const baseDomain = extractBaseDomain(hostname);
    return `https://www.google.com/s2/favicons?sz=64&domain=${baseDomain}`;
  };

  return (
    <>
      <Dashboard>
        <h2>Items</h2>
        <div id="items-list" className="mt-8">
          {data &&
            data.map((item) => (
              <div key={item.id} className="flex justify-start items-center">
                <div className="me-3">
                  <Image
                    src={getUrlFavicon(item.url)}
                    alt="Website favicon"
                    width={50}
                    height={50}
                  />
                </div>
                <div>
                  <p>{item.title}</p>
                  <p>{item.url}</p>
                </div>
              </div>
            ))}
        </div>
      </Dashboard>
    </>
  );
}
