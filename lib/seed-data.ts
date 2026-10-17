// Starting content for the site. Projects and packages are copied into the
// database by `prisma/seed.ts`; when DATABASE_URL is not set, the site reads
// them from here directly (see lib/content.ts).

export type Sector = "schools" | "health" | "legal" | "business"

export const sectors: { value: Sector; label: string }[] = [
  { value: "schools", label: "Schools" },
  { value: "health", label: "Health" },
  { value: "legal", label: "Legal" },
  { value: "business", label: "Business" },
]

export type ProjectImage = { src: string; alt: string; device: "phone" | "desktop" }

export type Project = {
  slug: string
  clientName: string
  sector: Sector
  summary: string
  problem: string
  solution: string
  result: string | null
  /** Key features, shown as a list on the case study. */
  highlights: string[]
  /** Shown as a badge when the project is not yet live, e.g. "In review with the school". */
  status: string | null
  liveUrl: string | null
  images: ProjectImage[]
  featured: boolean
  order: number
  published: boolean
}

export type Package = {
  id: string
  name: string
  /** null until the founders set real prices; the page then shows "Ask for a quote". */
  priceNLe: number | null
  /** e.g. "per year" for the care plan */
  priceSuffix: string | null
  deliveryDays: number | null
  blurb: string
  features: string[]
  highlighted: boolean
  order: number
  active: boolean
}

export type Service = {
  slug: string
  name: string
  short: string
  forWho: string
  includes: string[]
  addOns?: { name: string; description: string }[]
  exampleProjectSlug: string | null
  timeline: string
  startingPackage: string | null
  image: { src: string; alt: string }
  faqs: { question: string; answer: string }[]
}

// Content follows the Scienceworld Website Review (October 2026). The site is built and awaiting the school's
// approval: confirm the principal is happy to be shown before launching our site, then update status and liveUrl.
export const projects: Project[] = [
  {
    slug: "scienceworld-senior-secondary-school",
    clientName: "Scienceworld Senior Secondary School",
    sector: "schools",
    summary:
      "An 8-page, mobile-first website for a champion STEM school in Freetown, built to turn parents' interest into admissions enquiries.",
    problem:
      "Scienceworld was hard to find online. Its only presence was a general directory listing among unrelated businesses, using information the school did not control. Admissions enquiries came only by visit or phone during office hours, and the school's achievements, including first place in the 2026 Inter-Secondary School Chemistry Quiz and Practical Competition, were known mostly to those who were there.",
    solution:
      "We built an official website with eight pages: Home, About, Academics, STEM, Admissions, News, Gallery and Contact. The first screen tells parents that admissions for 2026–2027 are open and that Scienceworld is a champion STEM school. Parents can start an admissions enquiry at any hour, then continue on WhatsApp with their child's details already filled in.",
    result: null,
    highlights: [
      "Admissions enquiry form that continues on WhatsApp with the child's details pre-filled",
      "2026 Chemistry Championship results, front and centre on the home page",
      "STEM page showing robotics, coding, laboratory science and the student-led STEM TV show",
      "Academics page covering JSS and SSS subjects and WASSCE preparation",
      "News with topic filters and a nine-album photo gallery",
      "Call, WhatsApp and Apply Now fixed to the bottom of the screen on phones",
      "Search-ready titles and share previews for WhatsApp and Facebook",
    ],
    status: "Built and in review with the school",
    liveUrl: "https://science-world-stem-school.vercel.app",
    images: [
      { src: "/images/work/scienceworld-home-desktop.jpg", alt: "Scienceworld home page on desktop: Where Young Minds Build the Future, admissions open 2026–2027", device: "desktop" },
      { src: "/images/work/scienceworld-home-phone.jpg", alt: "Scienceworld home page on a phone, with Call, WhatsApp and Apply Now buttons fixed at the bottom", device: "phone" },
      { src: "/images/work/scienceworld-admissions-phone.jpg", alt: "Scienceworld admissions page on a phone: Join Scienceworld for 2026–2027", device: "phone" },
      { src: "/images/work/scienceworld-admissions-desktop.jpg", alt: "Scienceworld admissions enquiry form with WhatsApp, phone and campus details", device: "desktop" },
      { src: "/images/work/scienceworld-stem-desktop.jpg", alt: "Scienceworld STEM page: Where students build the future", device: "desktop" },
    ],
    featured: true,
    order: 1,
    published: true,
  },
]

export const packages: Package[] = [
  {
    id: "starter",
    name: "Starter",
    priceNLe: null, // TODO: set price in NLe
    priceSuffix: null,
    deliveryDays: 7,
    blurb: "A clean one-page site for a shop, pharmacy or small business.",
    features: [
      "One-page website that works well on phones",
      "WhatsApp chat button and click-to-call",
      "Google Maps location and opening hours",
      "Listed on Google Business Profile",
      "One round of changes",
    ],
    highlighted: false,
    order: 1,
    active: true,
  },
  {
    id: "standard",
    name: "Standard",
    priceNLe: null, // TODO: set price in NLe
    priceSuffix: null,
    deliveryDays: 14,
    blurb: "A full website for a school, clinic, law firm or growing business.",
    features: [
      "Up to 6 pages (home, about, services, gallery, contact and more)",
      "Enquiry or admissions form sent to your email",
      "Your own domain and business email address",
      "Basic Google search setup",
      "Two rounds of changes",
    ],
    highlighted: true,
    order: 2,
    active: true,
  },
  {
    id: "pro",
    name: "Pro",
    priceNLe: null, // TODO: set price in NLe
    priceSuffix: null,
    deliveryDays: 28,
    blurb: "A larger site with features your staff use every day.",
    features: [
      "Everything in Standard, with more pages",
      "News or events section you can update yourself",
      "Fees and mobile money payment instructions",
      "Staff training session",
      "Priority support for the first 3 months",
    ],
    highlighted: false,
    order: 3,
    active: true,
  },
  {
    id: "care",
    name: "Care plan",
    priceNLe: null, // TODO: set price in NLe
    priceSuffix: "per year",
    deliveryDays: null,
    blurb: "Hosting, updates and fixes so your site stays online and current.",
    features: ["Hosting and domain renewal", "Security updates and backups", "Small content changes each month", "Fixes when something breaks"],
    highlighted: false,
    order: 4,
    active: true,
  },
]

export const paymentMethods = ["Orange Money", "Africell Money", "Bank transfer"] as const

export const services: Service[] = [
  {
    slug: "school-websites",
    name: "School websites",
    short: "Admissions, fees, news and results that parents can check on their phones.",
    forWho: "Private and public schools, from nursery to senior secondary, that want parents to find them and stop phoning the office for basic information.",
    includes: [
      "Home, about, admissions, fees, gallery and contact pages",
      "Mobile-first design that loads quickly on 3G",
      "Your school's own domain and email address",
      "WhatsApp button so parents can message the office",
      "Call, WhatsApp and Apply buttons fixed to the bottom of the screen on phones",
      "Training so your staff can post news and photos",
    ],
    addOns: [
      { name: "Online admission form", description: "Parents apply from their phone and you receive each application by email." },
      { name: "Fees and mobile money", description: "Clear fee tables with Orange Money and Africell Money payment instructions." },
      { name: "Results and report cards", description: "Teachers enter marks once; parents and pupils check results with a secure PIN." },
    ],
    exampleProjectSlug: "scienceworld-senior-secondary-school",
    timeline: "2 to 3 weeks after we receive your content",
    startingPackage: "standard",
    image: { src: "/images/students-screen.jpg", alt: "Two students looking at a computer screen together" },
    faqs: [
      { question: "Can parents pay fees through the website?", answer: "The site shows fee amounts and step-by-step Orange Money and Africell Money instructions. Parents pay with their phone as usual and send you the confirmation." },
      { question: "Who updates the news and photos?", answer: "Your staff can. We train them in one short session, and our care plan covers anything they are not comfortable doing." },
      { question: "Can you build a results system too?", answer: "Yes. We build results and report card systems that teachers fill in once and parents check with a PIN. We quote it after a visit because every school grades differently." },
    ],
  },
  {
    slug: "business-websites",
    name: "Business websites",
    short: "Sites for clinics, law firms, estate agents and shops that bring in customers.",
    forWho: "Clinics, pharmacies, law firms, estate agencies, supermarkets and other businesses that want customers to find them on Google and reach them on WhatsApp.",
    includes: [
      "Pages for your services, team, location and contact",
      "WhatsApp chat and click-to-call buttons",
      "Google Maps location and Google Business Profile",
      "Enquiry form sent straight to your email",
      "Fast loading on phones and slow connections",
    ],
    exampleProjectSlug: null,
    timeline: "1 to 3 weeks depending on the package",
    startingPackage: "starter",
    image: { src: "/images/shop-owner.jpg", alt: "A shop owner smiling behind the counter of her store" },
    faqs: [
      { question: "How fast can my site be ready?", answer: "A Starter site is usually live within a week of receiving your logo, photos and text. Larger sites take 2 to 4 weeks." },
      { question: "Will my business show up on Google?", answer: "We set up the basics search engines need and link your Google Business Profile, which is what most people see when they search for a business near them." },
      { question: "Can I pay in instalments?", answer: "Talk to us. We usually take a deposit to start and the balance at launch." },
    ],
  },
  {
    slug: "website-redesign",
    name: "Website redesign",
    short: "Fix a slow, broken or outdated site and make it work on phones.",
    forWho: "Organisations whose current site is down, slow, hard to update, stuck on a free domain, or does not work well on phones.",
    includes: [
      "Review of your current site and what visitors need",
      "New mobile-first design with your existing content",
      "Moving your domain and email without losing them",
      "Redirects so old links and Google rankings keep working",
      "Speed and security checks before launch",
    ],
    exampleProjectSlug: null,
    timeline: "2 to 4 weeks",
    startingPackage: "standard",
    image: { src: "/images/developers-laptops.jpg", alt: "Two developers working on laptops" },
    faqs: [
      { question: "My site is down. Can you get it back?", answer: "Usually, yes. Send us the address on WhatsApp and we will tell you what went wrong and what it costs to fix." },
      { question: "Will I lose my domain or email?", answer: "No. We move them carefully and check everything works before we switch over." },
    ],
  },
  {
    slug: "custom-software",
    name: "Custom software",
    short: "Results systems, booking tools and dashboards built around how you work.",
    forWho: "Schools, clinics, NGOs and companies that run on paper or spreadsheets and want a simple system their staff will actually use.",
    includes: [
      "A visit to understand how your team works today",
      "A clickable mockup before we write any code",
      "Secure logins for staff, with roles and permissions",
      "Works on phones, tablets and computers",
      "Training, support and backups after launch",
    ],
    exampleProjectSlug: null,
    timeline: "Quoted after a visit, usually 4 to 10 weeks",
    startingPackage: null,
    image: { src: "/images/team-coding.jpg", alt: "Two people reviewing code on a laptop" },
    faqs: [
      { question: "How much does custom software cost?", answer: "It depends on what the system needs to do, so we quote after a free visit and a mockup. You see exactly what you are paying for before we start." },
      { question: "What can you build?", answer: "School results and report card systems, patient and appointment records, stock and sales tracking, and WhatsApp tools for sending updates to customers or parents." },
    ],
  },
]

export const whyNow = [
  { stat: "5G", label: "in Freetown since June 2025", detail: "Your customers browse on fast mobile data. If you are not online, they find someone who is." },
  { stat: "Instant", label: "mobile money since February 2025", detail: "Payments between Orange Money, Africell Money and banks now settle instantly." },
  { stat: "Big 5", label: "government push to go digital", detail: "Public services are moving online, and parents, patients and clients expect the same from you." },
]

export const steps = [
  { title: "Free visit", description: "We come to you for 15 minutes to understand what you need. No charge, no pressure." },
  { title: "Mockup", description: "We show you what your site will look like before you pay for the build." },
  { title: "Build", description: "We build it, you review it on your own phone, and we make your changes." },
  { title: "Launch and care", description: "We put it live, train your staff and keep it running with our care plan." },
]

export const generalFaqs = [
  { question: "How much does a website cost?", answer: "See our pricing page for package prices in New Leones. Custom software is quoted after a free visit." },
  { question: "How do we pay?", answer: "Orange Money, Africell Money or bank transfer. We usually take a deposit to start and the balance at launch." },
  { question: "How long does it take?", answer: "Most sites are live in 1 to 3 weeks after we receive your content. We give you a clear date at the start." },
  { question: "Do you look after the site afterwards?", answer: "Yes. Our yearly care plan covers hosting, updates, backups and fixes." },
]

export const team = [
  // TODO: replace with real names, roles and photos.
  { name: "Ibrahim Sesay", role: "Co-founder and CTO", bio: "Builds the websites and software, and makes sure they stay fast and secure.", photo: null as string | null },
  { name: "Co-founder", role: "Co-founder", bio: "Leads client relationships, visits and projects.", photo: null as string | null },
]
