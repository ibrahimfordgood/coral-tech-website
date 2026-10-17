import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"
import { Faq } from "@/components/faq"
import { Hero } from "@/components/hero"
import { ComingSoonCard, ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section"
import { ServiceCard } from "@/components/service-card"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { WhatsAppLink } from "@/components/whatsapp-link"
import { getProjects, getServices } from "@/lib/content"
import { generalFaqs, steps, whyNow } from "@/lib/seed-data"
import { site } from "@/lib/site"
import trader from "@/public/images/trader-mobile-money.jpg"

export const revalidate = 3600

export default async function HomePage() {
  const featured = (await getProjects()).filter((p) => p.featured).slice(0, 3)
  const services = getServices()

  return (
    <>
      <Hero />

      {/* Featured work */}
      <section aria-labelledby="work-heading" className="container-page py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="work-heading"
            eyebrow="Our work"
            title="Sites people actually use"
            intro="Every project starts on a phone, because that is where your visitors are."
          />
          <Link href="/work" className="inline-flex items-center gap-1.5 font-medium text-accent-strong hover:underline">
            See all work <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-2" data-reveal>
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
          {featured.length < 2 && <ComingSoonCard />}
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services-heading" className="border-y border-border bg-secondary/60">
        <div className="container-page py-20 md:py-28">
          <SectionHeading
            id="services-heading"
            eyebrow="What we do"
            title="Four ways we help you get online"
            intro="From a one-page site for your shop to a results system for your whole school."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why now */}
      <section aria-labelledby="why-heading" className="bg-primary text-primary-foreground">
        <div className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow text-primary-foreground/60">Why now</p>
            <h2 id="why-heading" className="mt-3 text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Sierra Leone is going digital. Your customers already are.
            </h2>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={trader}
                alt="A trader in Freetown smiling as she uses her phone at her stall"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-2xl bg-primary-foreground/10 lg:col-span-7" data-reveal>
            {whyNow.map((item) => (
              <li key={item.stat} className="bg-primary p-6 md:p-8">
                <p className="text-4xl font-bold tracking-tight text-accent md:text-5xl">{item.stat}</p>
                <p className="mt-2 font-medium">{item.label}</p>
                <p className="mt-2 leading-relaxed text-primary-foreground/70">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work */}
      <section aria-labelledby="how-heading" className="container-page py-20 md:py-28">
        <SectionHeading
          id="how-heading"
          eyebrow="How we work"
          title="From a free visit to a live site"
          intro="You see your site before you pay for the build, and we stay with you after launch."
        />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {steps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-foreground pt-5">
              <span className="text-sm font-medium text-accent-strong">Step {i + 1}</span>
              <h3 className="mt-2 text-xl font-bold tracking-tight">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* TODO: add a testimonial section here once a client agrees to be quoted. */}

      {/* Questions and contact */}
      <section aria-labelledby="faq-heading" className="border-t border-border">
        <div className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="faq-heading" eyebrow="Questions" title="What people ask us on calls" />
            <ul className="mt-8 space-y-4 text-lg">
              <li>
                <WhatsAppLink className="flex min-h-11 items-center gap-3 hover:underline">
                  <WhatsAppIcon className="size-5 text-whatsapp" /> WhatsApp {site.phone}
                </WhatsAppLink>
              </li>
              <li>
                <a href={site.phoneHref} className="flex min-h-11 items-center gap-3 hover:underline">
                  <Phone className="size-5 text-accent-strong" /> Call {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-3 hover:underline">
                  <Mail className="size-5 text-accent-strong" /> {site.email}
                </a>
              </li>
              <li className="flex min-h-11 items-center gap-3">
                <MapPin className="size-5 text-accent-strong" /> {site.address.street}, {site.address.city}
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <Faq items={generalFaqs} />
          </div>
        </div>
      </section>
    </>
  )
}
