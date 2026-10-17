import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="container-page flex min-h-dvh flex-col items-start justify-center py-20">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">We could not find that page</h1>
      <p className="mt-4 text-lg text-muted-foreground">It may have moved. Try the home page instead.</p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Go to the home page</Link>
      </Button>
    </main>
  )
}
