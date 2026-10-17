import type React from "react"
import Link from "next/link"
import { logout } from "@/app/admin/actions"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { requireUser } from "@/lib/auth"

export const dynamic = "force-dynamic"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser()
  return (
    <>
      <header className="border-b border-border bg-background">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Logo />
            <Link href="/admin" className="text-sm font-medium">
              Enquiries
            </Link>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-muted-foreground sm:inline">{user.name}</span>
            <form action={logout}>
              <Button type="submit" variant="outline" size="sm">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-page py-8">{children}</main>
    </>
  )
}
