import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Service } from "@/lib/seed-data"

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-black/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold tracking-tight">{service.name}</h3>
        <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{service.short}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong">
          Learn more
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
