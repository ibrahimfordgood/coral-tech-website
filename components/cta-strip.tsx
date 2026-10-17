import Link from "next/link"
import { CalendarCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { WhatsAppLink } from "@/components/whatsapp-link"

/** The closing call to action on every public page. */
export function CtaStrip() {
  return (
    <section aria-labelledby="cta-heading" className="border-t border-border bg-secondary">
      <div className="container-page flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="max-w-xl">
          <h2 id="cta-heading" className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Let&apos;s talk about your website
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Message us on WhatsApp, or book a free 15-minute visit at your school or office.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="whatsapp" size="lg">
            <WhatsAppLink>
              <WhatsAppIcon className="size-5" />
              Chat on WhatsApp
            </WhatsAppLink>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact#form">
              <CalendarCheck className="size-5" />
              Book a free 15-minute visit
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
