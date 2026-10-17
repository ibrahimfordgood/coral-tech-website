import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProject, getProjects } from "@/lib/content"
import { sectors } from "@/lib/seed-data"

export const revalidate = 3600

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = await getProject((await params).slug)
  if (!project) return {}
  const cover = project.images[0]
  return {
    title: `${project.clientName} case study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.clientName} case study`, description: project.summary, images: cover ? [{ url: cover.src, alt: cover.alt }] : undefined },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = await getProject((await params).slug)
  if (!project) notFound()
  const sector = sectors.find((s) => s.value === project.sector)?.label
  const [cover, ...rest] = project.images
  const phones = rest.filter((img) => img.device === "phone")
  const desktops = rest.filter((img) => img.device === "desktop")
  const label = "text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase"

  return (
    <article>
      <header className="border-b border-border">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">
            <Link href="/work" className="hover:underline">
              Our work
            </Link>{" "}
            · {sector}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight text-balance md:text-5xl">
            {project.clientName}
          </h1>
          {project.status && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-sm font-medium text-accent-strong">
              <span className="size-1.5 rounded-full bg-accent-strong" />
              {project.status}
            </p>
          )}
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{project.summary}</p>
          {project.liveUrl && (
            <Button asChild variant="outline" size="lg" className="mt-8">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                {project.status ? "View the preview site" : "Visit the live site"} <ArrowUpRight className="size-4" />
              </a>
            </Button>
          )}
        </div>
      </header>

      {cover && (
        <div className="container-page pt-12">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/5">
            <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-border px-4 py-3">
              <span className="size-2.5 rounded-full bg-foreground/15" />
              <span className="size-2.5 rounded-full bg-foreground/15" />
              <span className="size-2.5 rounded-full bg-foreground/15" />
            </div>
            <div className="relative aspect-[16/10] bg-muted">
              <Image src={cover.src} alt={cover.alt} fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover object-top" />
            </div>
          </div>
        </div>
      )}

      <div className="container-page grid gap-12 py-16 md:grid-cols-2 md:py-20">
        <section>
          <h2 className={label}>The problem</h2>
          <p className="mt-3 text-lg leading-relaxed">{project.problem}</p>
        </section>
        <section>
          <h2 className={label}>What we built</h2>
          <p className="mt-3 text-lg leading-relaxed">{project.solution}</p>
        </section>
        {project.highlights.length > 0 && (
          <section className="md:col-span-2">
            <h2 className={label}>Highlights</h2>
            <ul className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-lg">
                  <Check className="mt-1 size-5 shrink-0 text-accent-strong" />
                  {h}
                </li>
              ))}
            </ul>
          </section>
        )}
        {project.result && (
          <section className="md:col-span-2">
            <h2 className={label}>The result</h2>
            <p className="mt-3 text-lg leading-relaxed">{project.result}</p>
          </section>
        )}
      </div>

      {phones.length > 0 && (
        <section aria-label="On phones" className="border-y border-border bg-secondary/60">
          <div className="container-page py-16">
            <h2 className={label}>On phones</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-8 sm:justify-start">
              {phones.map((img) => (
                <div key={img.src} className="relative aspect-[390/844] w-60 overflow-hidden rounded-[2rem] border-8 border-foreground bg-muted shadow-xl shadow-black/10">
                  <Image src={img.src} alt={img.alt} fill sizes="240px" className="object-cover object-top" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {desktops.length > 0 && (
        <div className="container-page grid gap-6 py-16 sm:grid-cols-2">
          {desktops.map((img) => (
            <div key={img.src} className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-muted">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
            </div>
          ))}
        </div>
      )}
    </article>
  )
}
