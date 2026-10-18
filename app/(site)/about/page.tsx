import type { Metadata } from "next"
import Image from "next/image"
import { PageHeader, SectionHeading } from "@/components/section"
import { team } from "@/lib/seed-data"
import { site } from "@/lib/site"
import teamPhoto from "@/public/images/team-meeting.jpg"

export const metadata: Metadata = {
  title: "About us",
  description: "Coral Tech is a Freetown web design studio helping Sierra Leonean schools and businesses get online.",
  alternates: { canonical: "/about" },
}

/** First and last name initials, e.g. "Alhaji Kajalie Bangura" -> "AB". */
const initials = (name: string) => {
  const words = name.replace(/\b\w\.\s*/g, "").split(" ").filter(Boolean)
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase()
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Helping Sierra Leone's schools and businesses get online"
        intro="We are a small team in Freetown that builds websites for the schools and businesses around us."
      />

      {/* TODO: replace with the founders' own 3 to 4 sentence story. */}
      <section className="container-page grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:items-center">
        <div className="space-y-5 text-lg leading-relaxed lg:col-span-6">
          <p>
            Most schools, clinics and businesses in Freetown still have no website, or one that no longer works. Parents
            phone the school office for fee amounts. Patients cannot find opening hours. Customers go to whoever shows
            up on Google first.
          </p>
          <p>
            We started Coral Tech to fix that. We build fast, simple sites that work on the phones people actually use,
            with WhatsApp and mobile money built in, and we stay around to keep them running.
          </p>
          <p className="font-medium">Our mission: make it easy for every Sierra Leonean institution to be found, trusted and reached online.</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:col-span-6">
          <Image
            src={teamPhoto}
            alt="A small team talking through a project around a laptop"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-t border-border bg-secondary/60">
        <div className="container-page py-16 md:py-20">
          <SectionHeading eyebrow="Team" title="The people you will work with" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((person) => (
              <li key={person.name} className="rounded-2xl border border-border bg-card p-6">
                {person.photo ? (
                  <Image src={person.photo} alt={person.name} width={96} height={96} className="size-24 rounded-full object-cover" />
                ) : (
                  <span aria-hidden="true" className="flex size-24 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {initials(person.name)}
                  </span>
                )}
                <h3 className="mt-5 text-lg font-bold">{person.name}</h3>
                <p className="text-sm text-accent-strong">{person.role}</p>
                <p className="mt-3 leading-relaxed text-muted-foreground">{person.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <SectionHeading title="Company details" />
        <dl className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">Registered name</dt>
            <dd className="mt-1 font-medium">{site.legalName}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Office</dt>
            <dd className="mt-1 font-medium">
              {site.address.street}, {site.address.city}, {site.address.country}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Phone and WhatsApp</dt>
            <dd className="mt-1 font-medium">{site.phone}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Email</dt>
            <dd className="mt-1 font-medium">{site.email}</dd>
          </div>
        </dl>
      </section>
    </>
  )
}
