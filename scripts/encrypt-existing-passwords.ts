import 'dotenv/config';
import { prisma } from '../src/shared/lib/prisma';
import { encrypt, isEncrypted } from '../src/shared/lib/crypto';

/**
 * One-off migration: encrypts any vault item passwords still stored as plaintext.
 *
 * Safe to run multiple times — rows already in the `enc:v1:` format are skipped.
 * Requires VAULT_ENCRYPTION_KEY to be set (same key the app uses).
 *
 *   pnpm vault:encrypt
 */
async function main() {
  const items = await prisma.item.findMany({ select: { id: true, password: true } });

  let migrated = 0;
  let skipped = 0;

  for (const item of items) {
    if (isEncrypted(item.password)) {
      skipped++;
      continue;
    }

    await prisma.item.update({
      where: { id: item.id },
      data: { password: encrypt(item.password) },
    });
    migrated++;
  }

  console.log(`Done. Encrypted ${migrated} item(s), skipped ${skipped} already-encrypted item(s).`);
}

main()
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
