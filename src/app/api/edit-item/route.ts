import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function PUT(req: Request) {
  let data;
  try {
    data = await req.json();
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const { title, username, password, url, itemId } = data;

  const parsedItemId = parseInt(itemId);
  if (isNaN(parsedItemId)) {
    return new NextResponse("Invalid item id", { status: 400 });
  }

  await prisma.item.update({
    where: { id: parsedItemId },
    data: {
      title,
      username,
      password,
      url,
    },
  });

  return NextResponse.json({ message: `${title} edited` });
}
