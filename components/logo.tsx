import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2 text-lg font-bold tracking-tight", className)}>
      <span aria-hidden="true" className="relative inline-block size-6">
        <span className="absolute inset-0 rounded-full bg-accent" />
        <span className={cn("absolute top-1.5 left-1.5 size-3 rounded-full", inverse ? "bg-primary" : "bg-background")} />
      </span>
      <span className={inverse ? "text-primary-foreground" : "text-foreground"}>Coral Tech</span>
    </Link>
  )
}
