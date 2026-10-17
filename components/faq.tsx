"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "How much does a website cost?",
    answer:
      "We offer affordable packages priced in Leones. Basic sites start at competitive rates for Freetown businesses. We'll provide a detailed quote after our initial consultation based on your specific needs.",
  },
  {
    question: "My current website is down or broken. Can you fix it?",
    answer:
      "Yes, we specialize in fixing broken, outdated, or unfinished websites. Whether your site has server errors, uses a free domain, or needs a complete upgrade, we can get it working properly.",
  },
  {
    question: "Do you work with private schools?",
    answer:
      "Absolutely. Schools are one of our core sectors. We build websites that showcase your facilities, display enrollment information, and help parents find your school online. We understand what Freetown parents look for.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Most projects are completed within 2-4 weeks. Simple sites may take less, while more complex platforms with custom features may take 6-8 weeks. We'll give you a clear timeline during our consultation.",
  },
  {
    question: "Do you offer hosting and maintenance?",
    answer:
      "Yes, we offer yearly care plans that include hosting, security updates, and content changes. This keeps your website secure, fast, and up-to-date without you having to manage it yourself.",
  },
  {
    question: "How do we get started?",
    answer:
      "We start with a free 15-minute consultation to understand your needs. We'll visit your location, show you mockups of what your new website could look like, and provide a detailed proposal. No pressure, just a conversation about how we can help.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">FAQ</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Questions & Answers
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
