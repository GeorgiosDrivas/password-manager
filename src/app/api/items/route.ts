import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { auth } from '@core/auth';
import { decrypt } from '@/shared/lib/crypto';

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const items = await prisma.item.findMany({
      where: { userId: Number(session.user.id) },
      orderBy: { id: 'desc' },
    });

    const decryptedItems = items.map((item) => ({
      ...item,
      password: decrypt(item.password),
    }));

    return NextResponse.json(decryptedItems);
  } catch (err) {
    console.error('Error fetching items:', err);
    return new NextResponse('Server error', { status: 500 });
  }
}
