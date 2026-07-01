import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { auth } from '@core/auth';
import { noIdItemSchema } from '@/entities/item/model/ItemSchema';

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: RouteContext) {
  const session = await auth();

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { id } = await params;
  const itemId = parseInt(id, 10);
  if (isNaN(itemId)) {
    return new NextResponse('Invalid item id', { status: 400 });
  }

  let data;
  try {
    data = await req.json();
  } catch {
    return new NextResponse('Invalid JSON', { status: 400 });
  }

  const parsed = noIdItemSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { title, username, password, url } = parsed.data;

  const result = await prisma.item.updateMany({
    where: { id: itemId, userId: Number(session.user.id) },
    data: { title, username: username ?? '', password, url },
  });

  if (result.count === 0) {
    return new NextResponse('Item not found', { status: 404 });
  }

  return NextResponse.json({ message: `${title} edited` });
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  const session = await auth();

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { id } = await params;
  const itemId = parseInt(id, 10);
  if (isNaN(itemId)) {
    return new NextResponse('Invalid item id', { status: 400 });
  }

  const result = await prisma.item.deleteMany({
    where: { id: itemId, userId: Number(session.user.id) },
  });

  if (result.count === 0) {
    return new NextResponse('Item not found', { status: 404 });
  }

  return NextResponse.json({ message: 'Item deleted' });
}
