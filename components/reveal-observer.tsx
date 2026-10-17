"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/** Adds .is-visible to [data-reveal] elements as they scroll into view. */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
