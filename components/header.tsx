"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/logo"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { WhatsAppLink } from "@/components/whatsapp-link"
import { Button } from "@/components/ui/button"
import { nav } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "py-2 transition-colors hover:text-foreground",
                    isActive(item.href) ? "font-medium text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="whatsapp" className="h-10 rounded-full px-4">
            <WhatsAppLink>
              <WhatsAppIcon className="size-4" />
              Chat on WhatsApp
            </WhatsAppLink>
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-border md:hidden">
        <nav aria-label="Mobile" className="container-page py-4">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex min-h-12 items-center text-xl font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild variant="whatsapp" size="lg" className="mt-4 w-full">
            <WhatsAppLink>
              <WhatsAppIcon className="size-5" />
              Chat on WhatsApp
            </WhatsAppLink>
          </Button>
        </nav>
      </div>
    </header>
  )
}
