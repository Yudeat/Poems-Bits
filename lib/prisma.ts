import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

type ExtendedPrismaClient = ReturnType<typeof PrismaClient.prototype.$extends>;
const globalForPrisma = global as unknown as { prisma?: ExtendedPrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
