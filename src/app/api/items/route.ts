import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(req: NextRequest) {
  const userIdParam = req.nextUrl.searchParams.get("userId");

  if (!userIdParam) {
    return new NextResponse("Missing userId", { status: 400 });
  }

  const userId = parseInt(userIdParam);
  if (isNaN(userId)) {
    return new NextResponse("Invalid userId", { status: 400 });
  }

  try {
    const items = await prisma.item.findMany({
      where: { userId },
    });

    return NextResponse.json(items);
  } catch (err) {
    console.error("Error fetching items:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
