import type { WebsiteSettings } from "@/types";

function getWhatsAppNumber(phone: string) {
  return phone.split("/")[0]?.replace(/\D/g, "") ?? "";
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-6"
      fill="currentColor"
      viewBox="0 0 32 32"
    >
      <path d="M16.04 3.2A12.7 12.7 0 0 0 5.25 22.6L3.5 29l6.55-1.72A12.7 12.7 0 1 0 16.04 3.2Zm0 2.27a10.43 10.43 0 0 1 8.86 15.95 10.42 10.42 0 0 1-13.98 3.5l-.47-.28-3.9 1.02 1.04-3.8-.3-.49A10.43 10.43 0 0 1 16.04 5.47Zm-5.02 5.54c-.23 0-.59.09-.9.43-.31.34-1.19 1.16-1.19 2.84 0 1.67 1.22 3.29 1.39 3.52.17.22 2.36 3.78 5.82 5.15 2.88 1.14 3.47.91 4.1.85.62-.06 2.01-.82 2.29-1.61.28-.79.28-1.47.2-1.61-.09-.14-.31-.22-.65-.39-.34-.17-2.01-.99-2.32-1.1-.31-.12-.54-.17-.76.17-.23.34-.87 1.1-1.07 1.33-.2.22-.39.25-.73.08-.34-.17-1.43-.53-2.72-1.68-1.01-.9-1.69-2.01-1.89-2.35-.2-.34-.02-.52.15-.69.16-.15.34-.39.51-.59.17-.2.23-.34.34-.56.11-.22.06-.42-.03-.59-.08-.17-.76-1.84-1.04-2.52-.27-.65-.55-.56-.76-.57l-.65-.01Z" />
    </svg>
  );
}

export function WhatsAppChat({ settings }: { settings: WebsiteSettings }) {
  const phoneNumber = getWhatsAppNumber(settings.contactPhone);
  const message = encodeURIComponent(
    "Hello Vanguard Consulting, I want to make a general enquiry and chat about study abroad counseling.",
  );
  const href = phoneNumber ? `https://wa.me/${phoneNumber}?text=${message}` : "#contact";

  return (
    <a
      aria-label="Chat with Vanguard Consulting on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex min-h-14 max-w-[calc(100vw-2.5rem)] items-center gap-3 rounded-full bg-[#25d366] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(37,211,102,0.32)] ring-1 ring-white/40 transition duration-300 hover:-translate-y-1 hover:bg-[#1ebe5d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25d366] sm:bottom-7 sm:right-7"
      href={href}
      rel="noopener noreferrer"
      target={phoneNumber ? "_blank" : undefined}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/18">
        <WhatsAppIcon />
      </span>
      <span className="leading-tight">
        <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-white/80">
          WhatsApp
        </span>
        <span className="block whitespace-nowrap">Enquiry / Chat</span>
      </span>
    </a>
  );
}
