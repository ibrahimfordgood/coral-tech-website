import type { EnquiryStatus } from "@prisma/client"

export const statuses: { value: EnquiryStatus; label: string; className: string }[] = [
  { value: "New", label: "New", className: "bg-accent/15 text-accent-strong" },
  { value: "Contacted", label: "Contacted", className: "bg-sky-100 text-sky-800" },
  { value: "VisitBooked", label: "Visit booked", className: "bg-violet-100 text-violet-800" },
  { value: "Won", label: "Won", className: "bg-emerald-100 text-emerald-800" },
  { value: "Lost", label: "Lost", className: "bg-muted text-muted-foreground" },
]

export const statusMeta = (value: EnquiryStatus) => statuses.find((s) => s.value === value)!
