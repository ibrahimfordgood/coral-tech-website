"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createSession, destroySession, hashPassword, requireUser, verifyPassword } from "@/lib/auth"
import { db, hasDatabase } from "@/lib/db"
import { getRequestInfo } from "@/lib/request"
import { loginSchema } from "@/lib/validation"

export type LoginState = { error?: string }

const LOGIN_LIMIT = 5
const LOGIN_WINDOW_MS = 15 * 60 * 1000
// Verified against when the email is unknown, so response time does not reveal which emails exist.
let dummyHash: Promise<string> | undefined
const getDummyHash = () => (dummyHash ??= hashPassword("not-a-real-password"))

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!hasDatabase) return { error: "The database is not configured yet. Set DATABASE_URL first." }

  const { ipHash } = await getRequestInfo()
  const recentFailures = await db().loginAttempt.count({
    where: { ipHash, createdAt: { gte: new Date(Date.now() - LOGIN_WINDOW_MS) } },
  })
  if (recentFailures >= LOGIN_LIMIT) return { error: "Too many attempts. Please wait 15 minutes and try again." }

  const parsed = loginSchema.safeParse({ email: formData.get("email"), password: formData.get("password") })
  if (!parsed.success) return { error: "Please enter your email and password." }

  const user = await db().user.findUnique({ where: { email: parsed.data.email } })
  const ok = await verifyPassword(user?.passwordHash ?? (await getDummyHash()), parsed.data.password)
  if (!user || !ok) {
    await db().loginAttempt.create({ data: { ipHash } })
    return { error: "That email and password do not match." }
  }

  await db().loginAttempt.deleteMany({ where: { ipHash } })
  await createSession(user.id)
  redirect("/admin")
}

export async function logout() {
  await destroySession()
  redirect("/admin/login")
}

const updateSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["New", "Contacted", "VisitBooked", "Won", "Lost"]),
  notes: z.string().max(5000).optional(),
})

export async function updateEnquiry(formData: FormData) {
  await requireUser()
  const parsed = updateSchema.parse({
    id: formData.get("id"),
    status: formData.get("status"),
    notes: formData.get("notes") ?? undefined,
  })
  await db().enquiry.update({
    where: { id: parsed.id },
    data: { status: parsed.status, notes: parsed.notes?.trim() || null },
  })
  revalidatePath("/admin")
  revalidatePath(`/admin/enquiries/${parsed.id}`)
}
