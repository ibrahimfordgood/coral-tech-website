import { z } from "zod"

export const sectorOptions = ["School", "Clinic or health", "Law firm", "Estate agency", "Shop or business", "NGO or company", "Government", "Other"] as const

export const needOptions = ["New website", "Website redesign", "School results system", "Custom software", "Not sure yet"] as const

export const budgetOptions = ["Under NLe 5,000", "NLe 5,000 to 15,000", "NLe 15,000 to 40,000", "Over NLe 40,000", "Not sure yet"] as const

/** Strips spaces, dashes, dots and brackets, then checks +232XXXXXXXX or 0XXXXXXXX (F3). */
export function normaliseSlPhone(raw: string): string {
  return raw.replace(/[\s\-().]/g, "")
}

export const slPhonePattern = /^(\+232\d{8}|0\d{8})$/

const required = (label: string, max = 120) =>
  z.string().trim().min(1, `Please enter ${label}.`).max(max, `Please keep ${label} under ${max} characters.`)

export const enquirySchema = z.object({
  name: required("your name"),
  organisation: required("your school or business name", 160),
  sector: z.enum(sectorOptions, { errorMap: () => ({ message: "Please choose your sector." }) }),
  phone: z
    .string()
    .transform(normaliseSlPhone)
    .refine((v) => slPhonePattern.test(v), {
      message: "Please enter a Sierra Leone number, like 076 123 456 or +232 76 123 456.",
    }),
  email: z
    .string()
    .trim()
    .max(200)
    .optional()
    .transform((v) => (v ? v : undefined))
    .refine((v) => v === undefined || z.string().email().safeParse(v).success, {
      message: "That email address does not look right. You can leave it empty.",
    }),
  need: z.enum(needOptions, { errorMap: () => ({ message: "Please choose what you need." }) }),
  budgetRange: z
    .union([z.enum(budgetOptions), z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined)),
  message: required("a short message", 2000),
  sourcePage: z.string().max(200).optional(),
  utmSource: z.string().max(200).optional(),
})

export type EnquiryInput = z.infer<typeof enquirySchema>
export type EnquiryField = keyof EnquiryInput

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter your email."),
  password: z.string().min(1, "Please enter your password."),
})
