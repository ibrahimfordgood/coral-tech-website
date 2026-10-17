import "server-only"
import { Resend } from "resend"
import { site } from "@/lib/site"
import type { EnquiryInput } from "@/lib/validation"

/** Emails the founders about a new enquiry (F4). Never throws: a failed email must not lose the enquiry. */
export async function notifyFounders(enquiry: EnquiryInput, id: string | null) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ENQUIRY_NOTIFY_TO?.split(",").map((s) => s.trim()).filter(Boolean)
  if (!apiKey || !to?.length) {
    console.info("[enquiry] Email not configured; enquiry:", enquiry)
    return
  }

  const rows: [string, string | undefined][] = [
    ["Name", enquiry.name],
    ["Organisation", enquiry.organisation],
    ["Sector", enquiry.sector],
    ["Phone", enquiry.phone],
    ["Email", enquiry.email],
    ["Needs", enquiry.need],
    ["Budget", enquiry.budgetRange],
    ["From page", enquiry.sourcePage],
    ["Campaign", enquiry.utmSource],
  ]
  const text = [
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    "",
    enquiry.message,
    "",
    `WhatsApp them: https://wa.me/${enquiry.phone.replace(/^0/, "232").replace(/^\+/, "")}`,
    id ? `Open in admin: ${site.url}/admin/enquiries/${id}` : "",
  ].join("\n")

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: process.env.ENQUIRY_FROM ?? "Coral Tech website <onboarding@resend.dev>",
      to,
      replyTo: enquiry.email,
      subject: `New enquiry: ${enquiry.organisation} (${enquiry.need})`,
      text,
    })
    if (error) console.error("[enquiry] Resend error", error)
  } catch (err) {
    console.error("[enquiry] Failed to send notification", err)
  }
}
