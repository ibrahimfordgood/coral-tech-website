import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
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
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{project.summary}</p>
          {project.liveUrl && (
            <Button asChild variant="outline" size="lg" className="mt-8">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit the live site <ArrowUpRight className="size-4" />
              </a>
            </Button>
          )}
        </div>
      </header>

      {cover && (
        <div className="container-page pt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-muted">
            <Image src={cover.src} alt={cover.alt} fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
          </div>
        </div>
      )}

      <div className="container-page grid gap-12 py-16 md:grid-cols-3 md:py-20">
        <section>
          <h2 className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">The problem</h2>
          <p className="mt-3 text-lg leading-relaxed">{project.problem}</p>
        </section>
        <section>
          <h2 className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">What we built</h2>
          <p className="mt-3 text-lg leading-relaxed">{project.solution}</p>
        </section>
        {project.result && (
          <section>
            <h2 className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">The result</h2>
            <p className="mt-3 text-lg leading-relaxed">{project.result}</p>
          </section>
        )}
      </div>

      {rest.length > 0 && (
        <div className="container-page grid gap-6 pb-20 sm:grid-cols-2">
          {rest.map((img) => (
            <div
              key={img.src}
              className={img.device === "phone" ? "relative mx-auto aspect-[9/19] w-full max-w-xs overflow-hidden rounded-[2rem] border-8 border-foreground bg-muted" : "relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted"}
            >
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
            </div>
          ))}
        </div>
      )}
    </article>
  )
}
