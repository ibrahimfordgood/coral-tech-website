"use server"

import { db, hasDatabase } from "@/lib/db"
import { notifyFounders } from "@/lib/notify"
import { getRequestInfo } from "@/lib/request"
import { enquirySchema, type EnquiryField } from "@/lib/validation"

export type EnquiryState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<EnquiryField, string>>; values?: Record<string, string> }

const RATE_LIMIT = 3
const RATE_WINDOW_MS = 10 * 60 * 1000

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot (F5): real visitors never see or fill this field. Pretend it worked.
  if (String(formData.get("company_website") ?? "").length > 0) return { status: "success" }

  const raw = Object.fromEntries(
    ["name", "organisation", "sector", "phone", "email", "need", "budgetRange", "message", "sourcePage", "utmSource"].map((k) => [
      k,
      String(formData.get(k) ?? ""),
    ]),
  )

  const parsed = enquirySchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Partial<Record<EnquiryField, string>> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as EnquiryField
      fieldErrors[key] ??= issue.message
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values: raw }
  }

  const { ipHash, userAgent } = await getRequestInfo()
  let id: string | null = null

  if (hasDatabase) {
    const recent = await db().enquiry.count({
      where: { ipHash, createdAt: { gte: new Date(Date.now() - RATE_WINDOW_MS) } },
    })
    if (recent >= RATE_LIMIT) {
      return {
        status: "error",
        message: "You have sent several messages in the last few minutes. Please wait a little, or message us on WhatsApp.",
        values: raw,
      }
    }
    const saved = await db().enquiry.create({ data: { ...parsed.data, ipHash, userAgent } })
    id = saved.id
  }

  await notifyFounders(parsed.data, id)
  return { status: "success" }
}
