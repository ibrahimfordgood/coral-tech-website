import type { Metadata } from "next"
import { Check } from "lucide-react"
import { Faq } from "@/components/faq"
import { PageHeader, SectionHeading } from "@/components/section"
import { Button } from "@/components/ui/button"
import { WhatsAppLink } from "@/components/whatsapp-link"
import { getPackages } from "@/lib/content"
import { formatNLe } from "@/lib/format"
import { generalFaqs, paymentMethods } from "@/lib/seed-data"
import { cn } from "@/lib/utils"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Website packages in New Leones for schools and businesses in Sierra Leone. Pay with Orange Money, Africell Money or bank transfer.",
  alternates: { canonical: "/pricing" },
}

export default async function PricingPage() {
  const packages = await getPackages()
  const care = packages.find((p) => p.id === "care")
  const builds = packages.filter((p) => p.id !== "care")

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Clear prices in New Leones"
        intro="Pick a package, or tell us about your school or business and we will recommend one."
      />

      <section className="container-page py-16 md:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {builds.map((pkg) => (
            <div
              key={pkg.id}
              className={cn(
                "flex flex-col rounded-2xl border p-6 md:p-8",
                pkg.highlighted ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card",
              )}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{pkg.name}</h2>
                {pkg.highlighted && (
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">Most popular</span>
                )}
              </div>
              <p className={cn("mt-2", pkg.highlighted ? "text-primary-foreground/75" : "text-muted-foreground")}>{pkg.blurb}</p>
              <p className="mt-6 text-3xl font-bold tracking-tight">
                {pkg.priceNLe ? formatNLe(pkg.priceNLe) : "Ask for a quote"}
              </p>
              {pkg.deliveryDays && (
                <p className={cn("mt-1 text-sm", pkg.highlighted ? "text-primary-foreground/70" : "text-muted-foreground")}>
                  Ready in about {pkg.deliveryDays} days
                </p>
              )}
              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild variant={pkg.highlighted ? "accent" : "default"} size="lg" className="mt-8">
                <WhatsAppLink message={`Hi Coral Tech, I'm interested in the ${pkg.name} package.`}>Ask about {pkg.name}</WhatsAppLink>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {care && (
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 lg:col-span-2">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="text-xl font-bold">{care.name}</h2>
                <p className="text-2xl font-bold tracking-tight">
                  {care.priceNLe ? `${formatNLe(care.priceNLe)} ${care.priceSuffix ?? ""}` : "Ask for a quote"}
                </p>
              </div>
              <p className="mt-2 text-muted-foreground">{care.blurb}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {care.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-accent-strong" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-2xl border border-border bg-secondary p-6 md:p-8">
            <h2 className="text-xl font-bold">How to pay</h2>
            <ul className="mt-4 space-y-2">
              {paymentMethods.map((m) => (
                <li key={m} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-accent-strong" />
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We usually take a deposit to start and the balance at launch.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page border-t border-border py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading title="Questions about pricing" className="lg:col-span-4" />
          <div className="lg:col-span-8">
            <Faq items={generalFaqs} />
          </div>
        </div>
      </section>
    </>
  )
}
