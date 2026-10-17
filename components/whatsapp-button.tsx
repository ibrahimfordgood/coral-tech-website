import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { WhatsAppLink } from "@/components/whatsapp-link"

/** Floating chat button, always within thumb reach on phones. */
export function WhatsAppButton() {
  return (
    <WhatsAppLink
      aria-label="Chat with Coral Tech on WhatsApp"
      className="fixed right-4 bottom-4 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-whatsapp pr-5 pl-4 text-white shadow-lg shadow-black/20 transition-colors hover:bg-whatsapp-hover sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-6" />
      <span className="text-sm font-medium">Chat</span>
    </WhatsAppLink>
  )
}
