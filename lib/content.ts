import "server-only"
import { db, hasDatabase } from "@/lib/db"
import * as seed from "@/lib/seed-data"
import type { Package, Project, ProjectImage, Sector } from "@/lib/seed-data"

// Marketing pages read through these functions so they work with or without a
// database. With DATABASE_URL set, the database is the source of truth.

export async function getProjects(): Promise<Project[]> {
  if (!hasDatabase) return seed.projects.filter((p) => p.published).sort((a, b) => a.order - b.order)
  const rows = await db().project.findMany({ where: { published: true }, orderBy: { order: "asc" } })
  return rows.map((r) => ({
    ...r,
    sector: r.sector as Sector,
    images: r.images as unknown as ProjectImage[],
  }))
}

export async function getProject(slug: string): Promise<Project | null> {
  const all = await getProjects()
  return all.find((p) => p.slug === slug) ?? null
}

export async function getPackages(): Promise<Package[]> {
  if (!hasDatabase) return seed.packages.filter((p) => p.active).sort((a, b) => a.order - b.order)
  return db().package.findMany({ where: { active: true }, orderBy: { order: "asc" } })
}

export function getServices() {
  return seed.services
}

export function getService(slug: string) {
  return seed.services.find((s) => s.slug === slug) ?? null
}
