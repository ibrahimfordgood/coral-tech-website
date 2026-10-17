import type { Metadata } from "next"
import { PageHeader } from "@/components/section"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What Coral Tech collects through its enquiry form, why, and how to ask us to delete it.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy" title="Privacy policy" intro="Last updated 17 October 2026." />
      <div className="container-page max-w-3xl space-y-10 py-16 text-lg leading-relaxed md:py-20 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
        <section>
          <h2>What we collect</h2>
          <p>When you send us an enquiry, we collect what you type into the form:</p>
          <ul>
            <li>your name, organisation and sector</li>
            <li>your phone number and, if you give it, your email address</li>
            <li>what you need, your budget range if you choose one, and your message</li>
            <li>which page of our site you sent it from, and the campaign link you used to reach us, if any</li>
          </ul>
          <p>
            To stop spam, we also keep a scrambled (hashed) version of your internet address and your browser type. We
            cannot turn the hash back into your address.
          </p>
        </section>
        <section>
          <h2>Why we collect it</h2>
          <p>
            Only to reply to you, arrange a visit, and prepare a quote. We do not sell or share your details with anyone
            else, and we do not add you to a mailing list.
          </p>
        </section>
        <section>
          <h2>Analytics</h2>
          <p>
            We count page visits and button clicks with Vercel Analytics, which does not use cookies and does not
            identify you personally.
          </p>
        </section>
        <section>
          <h2>How long we keep it</h2>
          <p>We keep enquiries for up to two years so we can follow up, then delete them.</p>
        </section>
        <section>
          <h2>Ask us to delete your details</h2>
          <p>
            Email <a className="underline" href={`mailto:${site.email}`}>{site.email}</a> or message us on WhatsApp at{" "}
            {site.phone} and we will delete your enquiry within 7 days.
          </p>
        </section>
      </div>
    </>
  )
}
