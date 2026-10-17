// Usage: npm run create-admin -- founder@example.com "Full Name"
// Prompts for a password and creates (or resets) an admin user.
import { createInterface } from "node:readline/promises"
import { hash } from "@node-rs/argon2"
import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

async function main() {
  const [email, name] = process.argv.slice(2)
  if (!email || !name) {
    console.error('Usage: npm run create-admin -- email "Full Name"')
    process.exit(1)
  }
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  const password = await rl.question("Password (at least 12 characters): ")
  rl.close()
  if (password.length < 12) {
    console.error("Password must be at least 12 characters.")
    process.exit(1)
  }

  const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }) })
  const passwordHash = await hash(password, { memoryCost: 19456, timeCost: 2, parallelism: 1 })
  const normalised = email.trim().toLowerCase()
  await prisma.user.upsert({
    where: { email: normalised },
    create: { email: normalised, name, passwordHash },
    update: { name, passwordHash },
  })
  await prisma.$disconnect()
  console.log(`Admin user ready: ${normalised}`)
}

main()
