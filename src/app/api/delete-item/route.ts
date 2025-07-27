import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

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
