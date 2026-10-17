import { PrismaClient, type Prisma } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { packages, projects } from "../lib/seed-data"

const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }) })

async function main() {
  for (const p of projects) {
    const data = { ...p, images: p.images as unknown as Prisma.InputJsonValue }
    await prisma.project.upsert({ where: { slug: p.slug }, create: data, update: data })
  }
  for (const p of packages) {
    await prisma.package.upsert({ where: { id: p.id }, create: p, update: p })
  }
  console.log(`Seeded ${projects.length} projects and ${packages.length} packages.`)
}

main().finally(() => prisma.$disconnect())
