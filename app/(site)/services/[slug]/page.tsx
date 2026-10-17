import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check, Clock, Wallet } from "lucide-react"
import { Faq } from "@/components/faq"
import { ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section"
import { Button } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { WhatsAppLink } from "@/components/whatsapp-link"
import { getPackages, getProject, getService, getServices } from "@/lib/content"
import { formatNLe } from "@/lib/format"

export const revalidate = 3600

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = getService((await params).slug)
  if (!service) return {}
  return {
    title: service.name,
    description: `${service.short} ${service.forWho}`.slice(0, 160),
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.name, description: service.short, images: [{ url: service.image.src, alt: service.image.alt }] },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug)
  if (!service) notFound()

  const [example, packages] = await Promise.all([
    service.exampleProjectSlug ? getProject(service.exampleProjectSlug) : null,
    getPackages(),
  ])
  const startingPackage = packages.find((p) => p.id === service.startingPackage)
  const price =
    service.startingPackage === null
      ? "Quoted after a free visit"
      : startingPackage?.priceNLe
        ? `From ${formatNLe(startingPackage.priceNLe)}`
        : "Ask us for a quote"

  return (
    <>
      <section className="border-b border-border">
        <div className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">
              <Link href="/services" className="hover:underline">
                Services
              </Link>
            </p>
            <h1 className="mt-3 text-4xl leading-[1.08] font-bold tracking-tight text-balance md:text-5xl">{service.name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{service.forWho}</p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3 rounded-xl border border-border p-4">
                <Clock className="mt-0.5 size-5 shrink-0 text-accent-strong" />
                <div>
                  <dt className="text-sm text-muted-foreground">Typical timeline</dt>
                  <dd className="font-medium">{service.timeline}</dd>
                </div>
              </div>
              <div className="flex gap-3 rounded-xl border border-border p-4">
                <Wallet className="mt-0.5 size-5 shrink-0 text-accent-strong" />
                <div>
                  <dt className="text-sm text-muted-foreground">Starting price</dt>
                  <dd className="font-medium">{price}</dd>
                </div>
              </div>
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="whatsapp" size="lg">
                <WhatsAppLink>
                  <WhatsAppIcon className="size-5" />
                  Ask about {service.name.toLowerCase()}
                </WhatsAppLink>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">
                  See pricing <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:col-span-5">
            <Image src={service.image.src} alt={service.image.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="container-page grid gap-12 py-16 md:py-20 lg:grid-cols-2">
        <div>
          <SectionHeading title="What's included" />
          <ul className="mt-6 space-y-4">
            {service.includes.map((item) => (
              <li key={item} className="flex gap-3 text-lg">
                <Check className="mt-1 size-5 shrink-0 text-accent-strong" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        {service.addOns && (
          <div>
            <SectionHeading title="Add-ons for schools" />
            <ul className="mt-6 space-y-4">
              {service.addOns.map((addOn) => (
                <li key={addOn.name} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-bold">{addOn.name}</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{addOn.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {example && (
        <section className="border-t border-border bg-secondary/60">
          <div className="container-page py-16 md:py-20">
            <SectionHeading eyebrow="Example project" title="See one we built" />
            <div className="mt-10 max-w-xl">
              <ProjectCard project={example} />
            </div>
          </div>
        </section>
      )}

      <section className="container-page py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading title="Questions" className="lg:col-span-4" />
          <div className="lg:col-span-8">
            <Faq items={service.faqs} />
          </div>
        </div>
      </section>
    </>
  )
}
