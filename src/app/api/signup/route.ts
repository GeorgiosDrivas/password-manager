import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  let data;
  try {
    data = await req.json();
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const { name, username, password } = data;

  if (!username || !password || !name) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  const existingUser = await prisma.user.findFirst({ where: { username } });
  if (existingUser) {
    return new NextResponse("User already exists", { status: 400 });
  }

  await prisma.user.create({
    data: {
      name,
      username,
      password,
    },
  });

  return NextResponse.json({ message: "User created" });
}
