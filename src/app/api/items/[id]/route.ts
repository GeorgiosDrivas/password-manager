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

export async function DELETE(req: Request) {
  let data;
  try {
    data = await req.json();
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const { itemId } = data;

  if (!itemId) {
    return new NextResponse("Missing item ID", { status: 400 });
  }

  const parsedItemId = parseInt(itemId);
  if (isNaN(parsedItemId)) {
    return new NextResponse("Invalid item ID", { status: 400 });
  }

  await prisma.item.delete({
    where: {
      id: itemId,
    },
  });

  return NextResponse.json({ message: "Item deleted" });
}
