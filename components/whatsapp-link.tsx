"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { track } from "@vercel/analytics"
import { whatsappHref, whatsappMessageFor } from "@/lib/site"

type Props = Omit<React.ComponentProps<"a">, "href"> & {
  /** Override the pre-filled message; defaults to naming the current page (F1). */
  message?: string
}

/** Any link that opens our WhatsApp chat. Tracks the click for analytics (F13). */
export function WhatsAppLink({ message, onClick, children, ...props }: Props) {
  const pathname = usePathname()
  return (
    <a
      {...props}
      href={whatsappHref(message ?? whatsappMessageFor(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        track("whatsapp_click", { page: pathname })
        onClick?.(e)
      }}
    >
      {children}
    </a>
  )
}
