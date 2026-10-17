import "server-only"
import { createHash, randomBytes } from "node:crypto"
import { hash, verify } from "@node-rs/argon2"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"
import { db, hasDatabase } from "@/lib/db"

export const SESSION_COOKIE = "ct_session"
const SESSION_DAYS = 30

// argon2id with OWASP-recommended parameters (19 MiB, 2 iterations).
const ARGON_OPTIONS = { memoryCost: 19456, timeCost: 2, parallelism: 1 }

export function hashPassword(password: string) {
  return hash(password, ARGON_OPTIONS)
}

export async function verifyPassword(passwordHash: string, password: string) {
  try {
    return await verify(passwordHash, password)
  } catch {
    return false
  }
}

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex")

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url")
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)
  await db().session.create({ data: { id: sha256(token), userId, expiresAt } })
  const store = await cookies()
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  })
}

export async function destroySession() {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (token && hasDatabase) await db().session.deleteMany({ where: { id: sha256(token) } })
  store.delete(SESSION_COOKIE)
}

export const getCurrentUser = cache(async () => {
  if (!hasDatabase) return null
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token) return null
  const session = await db().session.findUnique({
    where: { id: sha256(token) },
    include: { user: { select: { id: true, name: true, email: true, role: true } } },
  })
  if (!session) return null
  if (session.expiresAt < new Date()) {
    await db().session.delete({ where: { id: session.id } }).catch(() => {})
    return null
  }
  return session.user
})

/** Call at the top of every admin page and admin server action. */
export async function requireUser() {
  const user = await getCurrentUser()
  if (!user) redirect("/admin/login")
  return user
}
