import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, MapPin } from "lucide-react"
import { PhoneMockup } from "@/components/phone-mockup"
import { Button } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { WhatsAppLink } from "@/components/whatsapp-link"
import skyline from "@/public/images/freetown-skyline.jpg"

const promises = ["Free 15-minute visit", "Prices in New Leones", "Live in 1 to 3 weeks"]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Soft coral glow behind the visual; pure CSS, no image cost. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[640px] rounded-full bg-accent/20 blur-3xl"
      />

      <div className="container-page relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1.5 text-xs font-medium text-primary-foreground/80">
            <span className="size-1.5 rounded-full bg-accent" />
            Website design in Freetown, Sierra Leone
          </p>

          <h1 className="mt-6 text-[2.5rem] leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Professional websites for Sierra Leone&apos;s <span className="text-accent">schools and businesses</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/75">
            We build fast, mobile-friendly websites that help parents find your school and customers find your
            business, with WhatsApp built in so they can reach you in one tap.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="whatsapp" size="lg">
              <WhatsAppLink>
                <WhatsAppIcon className="size-5" />
                Chat on WhatsApp
              </WhatsAppLink>
            </Button>
            <Button asChild variant="outline-inverse" size="lg">
              <Link href="/work">
                See our work
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <ul className="mt-8 flex flex-col gap-2 text-sm text-primary-foreground/75 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Check className="size-4 text-accent" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative ml-auto aspect-[4/3] w-full overflow-hidden rounded-3xl sm:aspect-[16/11] lg:aspect-[4/5] lg:w-[88%]">
            <Image
              src={skyline}
              alt="Freetown skyline looking out over the Atlantic"
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
            <p className="absolute right-4 bottom-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur">
              <MapPin className="size-3.5" />
              Freetown
            </p>
          </div>

          {/* Phone overlaps the photo: proof of the kind of site we build. */}
          <div className="absolute -bottom-6 left-2 origin-bottom-left scale-[0.72] sm:left-6 sm:scale-90 lg:-bottom-8 lg:left-0 lg:scale-100">
            <PhoneMockup />
          </div>

          {/* WhatsApp-style enquiry notification */}
          <div
            aria-hidden="true"
            className="absolute top-4 right-3 hidden max-w-[240px] items-start gap-3 rounded-2xl bg-white p-3 text-[#1b2230] shadow-xl shadow-black/30 sm:flex lg:top-10 lg:-right-4"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white">
              <WhatsAppIcon className="size-4" />
            </span>
            <span className="text-xs leading-snug">
              <span className="block font-bold">New enquiry</span>
              <span className="text-[#4b5563]">&ldquo;Hi Coral Tech, I saw your Business websites page.&rdquo;</span>
            </span>
          </div>
        </div>
      </div>
      <div className="h-6 lg:h-8" />
    </section>
  )
}
