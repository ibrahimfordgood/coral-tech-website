import type React from "react"
import { CtaStrip } from "@/components/cta-strip"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { LocalBusinessJsonLd } from "@/components/json-ld"
import { RevealObserver } from "@/components/reveal-observer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <CtaStrip />
      <Footer />
      <WhatsAppButton />
      <RevealObserver />
      <LocalBusinessJsonLd />
    </>
  )
}
