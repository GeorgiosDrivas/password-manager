import { prisma } from '@/shared/lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const hashedPassword = await bcrypt.hash('demoPass1', 10);

  const existingUser = await prisma.user.findUnique({
    where: { password: hashedPassword },
  });

  if (!existingUser) {
    const user = await prisma.user.create({
      data: {
        name: 'Demo User',
        username: 'demo',
        password: hashedPassword,
      },
    });

    console.log('✅ Demo user created:', user);
  } else {
    console.log('⚠️ Demo user already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
