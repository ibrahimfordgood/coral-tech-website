// Single source of truth for company details. Change contact info here only.
export const site = {
  name: "Coral Tech",
  legalName: "Coral Tech", // TODO: registered company name
  tagline: "Websites for Sierra Leone's schools and businesses",
  description:
    "Coral Tech designs and builds fast, mobile-friendly websites for schools and businesses in Freetown and across Sierra Leone.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "+232 75 408759",
  phoneHref: "tel:+23275408759",
  whatsappNumber: "23275408759",
  email: "hello@coraltech.com",
  address: {
    street: "Kortright (FBC)",
    city: "Freetown",
    country: "Sierra Leone",
    countryCode: "SL",
  },
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Kortright+Fourah+Bay+College+Freetown",
  hours: "Monday to Saturday, 9am to 6pm",
  hoursSchema: ["Mo-Sa 09:00-18:00"],
  replyPromise: "We reply within 1 working day.",
} as const

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const

/** Readable page name for the WhatsApp pre-filled message (F1). */
export function pageNameFor(pathname: string): string {
  if (pathname === "/") return "website"
  const [section, slug] = pathname.split("/").filter(Boolean)
  const titled = (s: string) =>
    s
      .split("-")
      .map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w))
      .join(" ")
  if (section === "services" && slug) return `${titled(slug)} page`
  if (section === "work" && slug) return `${titled(slug)} case study`
  return `${titled(section)} page`
}

export function whatsappHref(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function whatsappMessageFor(pathname: string): string {
  return `Hi Coral Tech, I saw your ${pageNameFor(pathname)}.`
}
