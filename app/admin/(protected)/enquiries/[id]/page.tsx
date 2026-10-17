import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Phone } from "lucide-react"
import { updateEnquiry } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { requireUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { statuses } from "../../status"

const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Freetown" })

/** Converts 0XXXXXXXX or +232XXXXXXXX to the international digits wa.me expects. */
const waNumber = (phone: string) => phone.replace(/^\+/, "").replace(/^0/, "232")

export default async function EnquiryPage({ params }: { params: Promise<{ id: string }> }) {
  await requireUser()
  const { id } = await params
  const e = await db().enquiry.findUnique({ where: { id } })
  if (!e) notFound()

  const details: [string, string | null][] = [
    ["Name", e.name],
    ["Organisation", e.organisation],
    ["Sector", e.sector],
    ["Phone", e.phone],
    ["Email", e.email],
    ["Needs", e.need],
    ["Budget", e.budgetRange],
    ["Preferred visit time", e.preferredVisitTime],
    ["Sent from page", e.sourcePage],
    ["Campaign", e.utmSource],
    ["Received", dateFormat.format(e.createdAt)],
  ]

  return (
    <>
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> All enquiries
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">{e.organisation}</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <section className="rounded-2xl border border-border bg-background p-6 lg:col-span-7">
          <dl className="grid gap-4 sm:grid-cols-2">
            {details
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k}>
                  <dt className="text-sm text-muted-foreground">{k}</dt>
                  <dd className="font-medium break-words">{v}</dd>
                </div>
              ))}
          </dl>
          <h2 className="mt-6 text-sm text-muted-foreground">Message</h2>
          <p className="mt-1 leading-relaxed whitespace-pre-wrap">{e.message}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="whatsapp">
              <a href={`https://wa.me/${waNumber(e.phone)}`} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4" /> WhatsApp this lead
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={`tel:${e.phone}`}>
                <Phone className="size-4" /> Call
              </a>
            </Button>
          </div>
        </section>

        <form action={updateEnquiry} className="space-y-4 rounded-2xl border border-border bg-background p-6 lg:col-span-5">
          <input type="hidden" name="id" value={e.id} />
          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-medium">
              Status
            </label>
            <select id="status" name="status" defaultValue={e.status} className="h-11 w-full rounded-md border border-input bg-card px-3">
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="notes" className="block text-sm font-medium">
              Notes
            </label>
            <Textarea id="notes" name="notes" rows={8} defaultValue={e.notes ?? ""} placeholder="Called on Tuesday, visit booked for Friday 10am..." className="bg-card text-base" />
          </div>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </div>
    </>
  )
}
