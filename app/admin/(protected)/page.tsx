import Link from "next/link"
import type { EnquiryStatus } from "@prisma/client"
import { requireUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { statusMeta, statuses } from "./status"

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Freetown" })

export default async function EnquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireUser()
  const { status } = await searchParams
  const active = statuses.find((s) => s.value === status)?.value as EnquiryStatus | undefined

  const [enquiries, counts] = await Promise.all([
    db().enquiry.findMany({
      where: active ? { status: active } : undefined,
      orderBy: { createdAt: "desc" },
      take: 200,
      select: { id: true, name: true, organisation: true, sector: true, phone: true, need: true, status: true, createdAt: true },
    }),
    db().enquiry.groupBy({ by: ["status"], _count: true }),
  ])
  const countFor = (s: EnquiryStatus) => counts.find((c) => c.status === s)?._count ?? 0
  const total = counts.reduce((sum, c) => sum + c._count, 0)

  const tabs = [{ value: undefined, label: "All", count: total }, ...statuses.map((s) => ({ ...s, count: countFor(s.value) }))]

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">Enquiries</h1>

      <nav aria-label="Filter by status" className="-mx-4 mt-6 overflow-x-auto px-4">
        <ul className="flex gap-2">
          {tabs.map((t) => (
            <li key={t.label}>
              <Link
                href={t.value ? `/admin?status=${t.value}` : "/admin"}
                aria-current={t.value === active ? "page" : undefined}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm whitespace-nowrap",
                  t.value === active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-secondary",
                )}
              >
                {t.label}
                <span className="tabular-nums opacity-70">{t.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {enquiries.length === 0 ? (
        <p className="mt-10 text-muted-foreground">No enquiries here yet.</p>
      ) : (
        <ul className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background">
          {enquiries.map((e) => {
            const meta = statusMeta(e.status)
            return (
              <li key={e.id}>
                <Link href={`/admin/enquiries/${e.id}`} className="grid gap-1 p-4 hover:bg-secondary/60 sm:grid-cols-12 sm:items-center sm:gap-4">
                  <span className="sm:col-span-4">
                    <span className="block font-medium">{e.organisation}</span>
                    <span className="block text-sm text-muted-foreground">
                      {e.name} · {e.phone}
                    </span>
                  </span>
                  <span className="text-sm sm:col-span-3">{e.need}</span>
                  <span className="text-sm text-muted-foreground sm:col-span-2">{e.sector}</span>
                  <span className="sm:col-span-1">
                    <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap", meta.className)}>{meta.label}</span>
                  </span>
                  <span className="text-sm text-muted-foreground sm:col-span-2 sm:text-right">{dateFormat.format(e.createdAt)}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
