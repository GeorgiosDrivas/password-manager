import { prisma } from '@/shared/lib/prisma';
import bcrypt from 'bcrypt';

export async function ensureDemoUser() {
  const existingUser = await prisma.user.findUnique({
    where: { username: 'demo' },
  });

  if (existingUser) return;

  const hashedPassword = await bcrypt.hash('demoPass1', 10);

  await prisma.user.create({
    data: {
      name: 'Demo User',
      username: 'demo',
      password: hashedPassword,
    },
  });

  console.log('✅ Demo user created in production');
}
