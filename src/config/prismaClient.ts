// prismaClient.ts
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = global.prisma || new PrismaClient();

// eslint-disable-next-line node/no-process-env
if (process.env.NODE_ENV === "production") {
  if (!global.prisma) {
    global.prisma = prisma;
  }
} else {
  // Always create a new Prisma Client in development
  global.prisma = new PrismaClient();
}

export default prisma;
