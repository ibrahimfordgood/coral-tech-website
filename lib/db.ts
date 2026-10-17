import "server-only"
import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

export const hasDatabase = Boolean(process.env.DATABASE_URL)

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function createClient() {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
  return new PrismaClient({ adapter })
}

/** Throws if DATABASE_URL is missing; check `hasDatabase` first where a fallback exists. */
export function db(): PrismaClient {
  if (!hasDatabase) throw new Error("DATABASE_URL is not set")
  globalForPrisma.prisma ??= createClient()
  return globalForPrisma.prisma
}
