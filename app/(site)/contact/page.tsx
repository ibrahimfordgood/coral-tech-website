import type { Metadata } from "next"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { EnquiryForm } from "@/components/enquiry-form"
import { PageHeader } from "@/components/section"
import { Button } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { WhatsAppLink } from "@/components/whatsapp-link"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact us",
  description: `Message Coral Tech on WhatsApp, call ${site.phone}, or book a free 15-minute visit at your school or office in Freetown.`,
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Book a free 15-minute visit"
        intro="Tell us a little about your school or business and we will call you to arrange a time. Prefer to chat? WhatsApp is fastest."
      />
      <section className="container-page grid gap-14 py-16 md:py-20 lg:grid-cols-12">
        <div id="form" className="scroll-mt-24 lg:col-span-7">
          <EnquiryForm />
        </div>

        <aside className="space-y-8 lg:col-span-5">
          <div className="rounded-2xl bg-primary p-6 text-primary-foreground md:p-8">
            <h2 className="text-xl font-bold">Fastest reply: WhatsApp</h2>
            <p className="mt-2 text-primary-foreground/75">Send us a message and we will get back to you the same day during office hours.</p>
            <Button asChild variant="whatsapp" size="lg" className="mt-6 w-full">
              <WhatsAppLink>
                <WhatsAppIcon className="size-5" />
                Chat on WhatsApp
              </WhatsAppLink>
            </Button>
          </div>

          <ul className="space-y-5 text-lg">
            <li className="flex gap-4">
              <Phone className="mt-1 size-5 shrink-0 text-accent-strong" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <a href={site.phoneHref} className="font-medium hover:underline">
                  {site.phone}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail className="mt-1 size-5 shrink-0 text-accent-strong" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a href={`mailto:${site.email}`} className="font-medium hover:underline">
                  {site.email}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-accent-strong" />
              <div>
                <p className="text-sm text-muted-foreground">Office</p>
                <p className="font-medium">
                  {site.address.street}, {site.address.city}
                </p>
                <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="text-base text-accent-strong underline">
                  Open in Google Maps
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <Clock className="mt-1 size-5 shrink-0 text-accent-strong" />
              <div>
                <p className="text-sm text-muted-foreground">Office hours</p>
                <p className="font-medium">{site.hours}</p>
              </div>
            </li>
          </ul>
        </aside>
      </section>
    </>
  )
}
