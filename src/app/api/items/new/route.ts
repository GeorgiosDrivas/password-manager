import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { auth } from '@core/auth';
import { noIdItemSchema } from '@/entities/item/model/ItemSchema';

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
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

  await prisma.item.create({
    data: {
      title,
      username: username ?? '',
      password,
      url,
      userId: Number(session.user.id),
    },
  });

  return NextResponse.json({ message: 'New item created' });
}
