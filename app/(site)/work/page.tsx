import type { Metadata } from "next"
import Link from "next/link"
import { ComingSoonCard, ProjectCard } from "@/components/project-card"
import { PageHeader } from "@/components/section"
import { getProjects } from "@/lib/content"
import { sectors, type Sector } from "@/lib/seed-data"
import { cn } from "@/lib/utils"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Our work",
  description: "Websites and software Coral Tech has built for schools and businesses in Sierra Leone.",
  alternates: { canonical: "/work" },
}

export default async function WorkPage({ searchParams }: { searchParams: Promise<{ sector?: string }> }) {
  const { sector } = await searchParams
  const active = sectors.find((s) => s.value === sector)?.value as Sector | undefined
  const all = await getProjects()
  const projects = active ? all.filter((p) => p.sector === active) : all

  const filters = [{ value: undefined, label: "All" }, ...sectors]

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Projects we are proud of"
        intro="Each case study shows the problem, what we built and how it is used."
      />
      <section className="container-page py-12 md:py-16">
        <nav aria-label="Filter by sector" className="-mx-4 overflow-x-auto px-4">
          <ul className="flex gap-2">
            {filters.map((f) => {
              const isActive = f.value === active
              return (
                <li key={f.label}>
                  <Link
                    href={f.value ? `/work?sector=${f.value}` : "/work"}
                    scroll={false}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "inline-flex h-11 items-center rounded-full border px-5 text-sm whitespace-nowrap transition-colors",
                      isActive ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary",
                    )}
                  >
                    {f.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
          <ComingSoonCard />
        </div>
      </section>
    </>
  )
}
