"use client"

import type React from "react"
import { useActionState, useEffect, useRef, useState } from "react"
import { CheckCircle2, Loader2 } from "lucide-react"
import { track } from "@vercel/analytics"
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { WhatsAppLink } from "@/components/whatsapp-link"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"
import { budgetOptions, needOptions, sectorOptions, type EnquiryField } from "@/lib/validation"

const fieldClass = "h-12 bg-card text-base"

function Field({
  name,
  label,
  hint,
  error,
  children,
}: {
  name: EnquiryField
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
        {hint && <span className="font-normal text-muted-foreground"> {hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

function NativeSelect({ name, options, defaultValue, placeholder, error, required }: {
  name: string
  options: readonly string[]
  defaultValue?: string
  placeholder: string
  error?: string
  required?: boolean
}) {
  return (
    <select
      id={name}
      name={name}
      defaultValue={defaultValue ?? ""}
      required={required}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${name}-error` : undefined}
      className={cn(
        "w-full rounded-md border border-input px-3 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive",
        fieldClass,
      )}
    >
      <option value="" disabled={required}>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

export function EnquiryForm() {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, { status: "idle" })
  const [source, setSource] = useState({ page: "/contact", utm: "" })
  const successRef = useRef<HTMLDivElement>(null)

  // Record where the visitor came from (F12-ready): the referring page on our site and any UTM tags.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const utm = ["utm_source", "utm_medium", "utm_campaign"]
      .map((k) => params.get(k))
      .filter(Boolean)
      .join(" / ")
    let page = "/contact"
    try {
      const ref = new URL(document.referrer)
      if (ref.origin === window.location.origin) page = ref.pathname
    } catch {}
    setSource({ page, utm })
  }, [])

  useEffect(() => {
    if (state.status === "success") {
      track("enquiry_submitted")
      successRef.current?.focus()
    }
  }, [state])

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="rounded-2xl border border-border bg-card p-8 outline-none">
        <CheckCircle2 className="size-10 text-whatsapp" />
        <h2 className="mt-4 text-2xl font-bold tracking-tight">Thank you. We have your message.</h2>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          {site.replyPromise} If it is urgent, message us on WhatsApp at {site.phone}.
        </p>
        <Button asChild variant="whatsapp" size="lg" className="mt-6">
          <WhatsAppLink message="Hi Coral Tech, I just sent an enquiry on your website.">
            <WhatsAppIcon className="size-5" />
            Chat on WhatsApp
          </WhatsAppLink>
        </Button>
      </div>
    )
  }

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {}
  const values = state.status === "error" ? (state.values ?? {}) : {}
  const invalid = (name: EnquiryField) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  })

  return (
    // Remount after each error so defaultValue restores what the visitor typed.
    <form key={JSON.stringify(values)} action={action} noValidate className="space-y-5">
      {state.status === "error" && (
        <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-destructive">
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Your name" error={errors.name}>
          <Input id="name" name="name" autoComplete="name" defaultValue={values.name} className={fieldClass} {...invalid("name")} />
        </Field>
        <Field name="organisation" label="School or business" error={errors.organisation}>
          <Input id="organisation" name="organisation" autoComplete="organization" defaultValue={values.organisation} className={fieldClass} {...invalid("organisation")} />
        </Field>
        <Field name="sector" label="Sector" error={errors.sector}>
          <NativeSelect name="sector" options={sectorOptions} defaultValue={values.sector} placeholder="Choose one" error={errors.sector} required />
        </Field>
        <Field name="phone" label="Phone number" error={errors.phone}>
          <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="076 123 456" defaultValue={values.phone} className={fieldClass} {...invalid("phone")} />
        </Field>
        <Field name="email" label="Email" hint="(optional)" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" defaultValue={values.email} className={fieldClass} {...invalid("email")} />
        </Field>
        <Field name="need" label="What do you need?" error={errors.need}>
          <NativeSelect name="need" options={needOptions} defaultValue={values.need} placeholder="Choose one" error={errors.need} required />
        </Field>
        <Field name="budgetRange" label="Budget" hint="(optional)" error={errors.budgetRange}>
          <NativeSelect name="budgetRange" options={budgetOptions} defaultValue={values.budgetRange} placeholder="Prefer not to say" error={errors.budgetRange} />
        </Field>
      </div>

      <Field name="message" label="Tell us a little about it" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          defaultValue={values.message}
          placeholder="For example: we are a secondary school with 600 pupils and want parents to see admissions, fees and news online."
          className="min-h-32 bg-card text-base"
          {...invalid("message")}
        />
      </Field>

      {/* Honeypot (F5): hidden from people and screen readers, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Leave this empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="sourcePage" value={source.page} />
      <input type="hidden" name="utmSource" value={source.utm} />

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending && <Loader2 className="size-4 animate-spin" />}
        {pending ? "Sending..." : "Send enquiry"}
      </Button>
      <p className="text-sm text-muted-foreground">
        {site.replyPromise} We only use your details to reply to you. See our{" "}
        <a href="/privacy" className="underline">
          privacy policy
        </a>
        .
      </p>
    </form>
  )
}
