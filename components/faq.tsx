import { Plus } from "lucide-react"

type Item = { question: string; answer: string }

/** Accessible FAQ list using native <details>, so it works without JavaScript. */
export function Faq({ items }: { items: Item[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-lg font-medium [&::-webkit-details-marker]:hidden">
            {item.question}
            <Plus className="size-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="pr-10 pb-5 leading-relaxed text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
