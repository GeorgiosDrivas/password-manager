import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  let data;
  try {
    data = await req.json();
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const { title, username, password, url, userId } = data;

  if (!title || !username || !password || !url) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  const parsedUserId = parseInt(userId);
  if (isNaN(parsedUserId)) {
    return new NextResponse("Invalid userId", { status: 400 });
  }

  await prisma.item.create({
    data: {
      title,
      username,
      password,
      url,
      userId: parsedUserId,
    },
  });

  return NextResponse.json({ message: "New item created" });
}
