// src/lib/prisma.ts
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const adapter: any = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma =
  global.prisma ??
  new PrismaClient({
    adapter, // <-- pass the driver adapter here
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
