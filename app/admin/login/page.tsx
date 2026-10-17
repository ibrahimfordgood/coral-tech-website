import { redirect } from "next/navigation"
import { Logo } from "@/components/logo"
import { getCurrentUser } from "@/lib/auth"
import { LoginForm } from "./login-form"

export const dynamic = "force-dynamic"

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/admin")
  return (
    <main className="flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8">
        <Logo />
        <h1 className="mt-6 text-2xl font-bold tracking-tight">Admin sign in</h1>
        <LoginForm />
      </div>
    </main>
  )
}
