import type React from "react"
import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  intro?: React.ReactNode
  id?: string
  className?: string
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="mt-3 text-3xl font-bold tracking-tight text-balance md:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>}
    </div>
  )
}

/** Top of every inner page. */
export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: React.ReactNode; intro?: React.ReactNode }) {
  return (
    <section className="border-b border-border">
      <div className="container-page py-14 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight text-balance md:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>}
      </div>
    </section>
  )
}
