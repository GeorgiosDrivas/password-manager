import { prisma } from '@/shared/lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const hashedPassword = await bcrypt.hash('demoPass1', 10);

  await prisma.user.upsert({
    where: { username: 'demo' },
    update: {},
    create: {
      name: 'Demo User',
      username: 'demo',
      password: hashedPassword,
    },
  });

  console.log('✅ Demo user ensured (created if not exists)');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });