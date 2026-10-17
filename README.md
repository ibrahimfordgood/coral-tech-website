# Coral Tech website

Marketing site and enquiry admin for Coral Tech, Freetown. Built with Next.js (App Router), Tailwind CSS, Prisma on Neon Postgres, and Resend.

## Run locally

```bash
npm install
npm run dev
```

The site runs without a database or email key. Enquiries are then written to the server log instead of saved, and content comes from `lib/seed-data.ts`.

## Connect the database and email

1. Create a Neon project and copy both connection strings.
2. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` (pooled) and `DIRECT_URL` (direct)
   - `RESEND_API_KEY`, `ENQUIRY_FROM` (an address on a domain verified in Resend), `ENQUIRY_NOTIFY_TO` (founder emails, comma-separated)
   - `IP_HASH_SALT` (any long random string)
   - `NEXT_PUBLIC_SITE_URL` (for example `https://coraltech.sl`)
3. Create the tables, load the starting projects and packages, and create each founder's login:

```bash
npm run db:migrate -- --name init
npm run db:seed
npm run create-admin -- founder@coraltech.sl "Full Name"
```

4. Sign in at `/admin`.

On Vercel, add the same variables in Project Settings → Environment Variables, and run `npm run db:deploy` against production after each new migration.

## Where things live

| What | Where |
| --- | --- |
| Phone, WhatsApp, email, address, hours | `lib/site.ts` |
| Services, packages, projects, FAQs, team | `lib/seed-data.ts` (projects and packages are copied to the database by the seed) |
| Enquiry form validation | `lib/validation.ts` |
| Enquiry server action (save, rate limit, email) | `app/actions/enquiry.ts` |
| Admin auth | `lib/auth.ts`, `proxy.ts`, `app/admin/actions.ts` |
| Design rules | `DESIGN_GUIDE.md` |

## Before launch

- [ ] Set package prices in NLe (`lib/seed-data.ts` or the `Package` table)
- [ ] Get Scienceworld's permission and add real screenshots
- [ ] Add team names, photos and the founders' story (`app/(site)/about/page.tsx`)
- [ ] Set the registered company name in `lib/site.ts`
- [ ] Register the domain and set `NEXT_PUBLIC_SITE_URL`
