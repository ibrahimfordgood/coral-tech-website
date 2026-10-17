import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Clock } from "lucide-react"
import { sectors, type Project } from "@/lib/seed-data"

export function ProjectCard({ project }: { project: Project }) {
  const cover = project.images[0]
  const sector = sectors.find((s) => s.value === project.sector)?.label
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{sector}</p>
          <h3 className="mt-1 text-xl font-bold tracking-tight group-hover:underline group-hover:underline-offset-4">
            {project.clientName}
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">{project.summary}</p>
        </div>
        <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  )
}

/** Shown alongside real projects while the portfolio is still small. */
export function ComingSoonCard() {
  return (
    <div className="flex aspect-[4/3] flex-col justify-end rounded-2xl border border-dashed border-foreground/20 p-6 md:p-8">
      <Clock className="size-6 text-accent-strong" />
      <h3 className="mt-4 text-xl font-bold tracking-tight">More projects coming soon</h3>
      <p className="mt-2 max-w-sm leading-relaxed text-muted-foreground">
        We are building sites for schools, clinics and businesses in Freetown now. Yours could be next.
      </p>
    </div>
  )
}
