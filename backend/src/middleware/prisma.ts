import { PrismaClient } from "../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

function createPrisma(databaseUrl: string) {
  return new PrismaClient({
    accelerateUrl: databaseUrl,
  }).$extends(withAccelerate());
}

type Prisma = ReturnType<typeof createPrisma>;
let prisma: Prisma | undefined;

export function getPrisma(databaseUrl: string): Prisma {
  if (!prisma) {
    prisma = createPrisma(databaseUrl);
  }
  return prisma;
}
