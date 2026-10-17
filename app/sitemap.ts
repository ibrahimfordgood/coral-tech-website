import type { MetadataRoute } from "next"
import { getProjects, getServices } from "@/lib/content"
import { site } from "@/lib/site"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/services", "/work", "/pricing", "/about", "/contact", "/privacy"]
  const services = getServices().map((s) => `/services/${s.slug}`)
  const projects = (await getProjects()).map((p) => `/work/${p.slug}`)
  return [...pages, ...services, ...projects].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }))
}
