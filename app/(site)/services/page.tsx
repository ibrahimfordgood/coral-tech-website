import type { Metadata } from "next"
import { PageHeader } from "@/components/section"
import { ServiceCard } from "@/components/service-card"
import { getServices } from "@/lib/content"

export const metadata: Metadata = {
  title: "Services",
  description:
    "School websites, business websites and website redesigns, built in Freetown, Sierra Leone.",
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  const services = getServices()
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Websites that work on every phone"
        intro="Pick what fits you today. We start every project with a free 15-minute visit."
      />
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
    </>
  )
}
