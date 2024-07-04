/* eslint-disable no-var */
// In spec/types/global.d.ts

import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient;
    }
  }
}

declare global {
  var prisma: PrismaClient | undefined;
}
// An empty export to ensure this is treated as a module
export {};
