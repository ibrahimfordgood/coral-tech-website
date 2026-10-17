import Link from "next/link"
import { Logo } from "@/components/logo"
import { services } from "@/lib/seed-data"
import { nav, site } from "@/lib/site"

export function Footer() {
  return (
    <footer className="bg-primary pt-16 pb-28 text-primary-foreground sm:pb-16">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo inverse />
            <p className="mt-4 max-w-sm leading-relaxed text-primary-foreground/70">
              Websites and software for Sierra Leone&apos;s schools and businesses. Built in Freetown.
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-sm font-medium">Company</h2>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-sm font-medium">Services</h2>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-primary-foreground">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-sm font-medium">Contact</h2>
            <address className="mt-4 space-y-3 text-sm not-italic text-primary-foreground/70">
              <p>
                <a href={site.phoneHref} className="hover:text-primary-foreground">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="hover:text-primary-foreground">
                  {site.email}
                </a>
              </p>
              <p>
                {site.address.street}, {site.address.city}, {site.address.country}
              </p>
              <p>{site.hours}</p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/60 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <Link href="/privacy" className="hover:text-primary-foreground">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
