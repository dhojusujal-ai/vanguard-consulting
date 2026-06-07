import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/types";

const destinationFlags: Record<string, string> = {
  Australia: "🇦🇺",
  Melbourne: "🇦🇺",
  Sydney: "🇦🇺",
  Canada: "🇨🇦",
  Toronto: "🇨🇦",
  Vancouver: "🇨🇦",
  "United Kingdom": "🇬🇧",
  London: "🇬🇧",
  USA: "🇺🇸",
  "United States": "🇺🇸",
  Boston: "🇺🇸",
  India: "🇮🇳",
  Bengaluru: "🇮🇳",
  Bangladesh: "🇧🇩",
  Dhaka: "🇧🇩",
  Europe: "🇪🇺",
};

function getFlag(destination: string): string {
  for (const [key, flag] of Object.entries(destinationFlags)) {
    if (destination.includes(key)) return flag;
  }
  return "🌍";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const accentColors = [
  { bg: "bg-[#087ec3]/10", text: "text-[#087ec3]", border: "border-[#087ec3]/25", badge: "bg-[#087ec3]/10 text-[#087ec3] border-[#087ec3]/25" },
  { bg: "bg-[#ed1c24]/10", text: "text-[#ed1c24]", border: "border-[#ed1c24]/25", badge: "bg-[#ed1c24]/10 text-[#ed1c24] border-[#ed1c24]/25" },
  { bg: "bg-[#e52772]/10", text: "text-[#e52772]", border: "border-[#e52772]/25", badge: "bg-[#e52772]/10 text-[#e52772] border-[#e52772]/25" },
  { bg: "bg-[#f75b20]/10", text: "text-[#f75b20]", border: "border-[#f75b20]/25", badge: "bg-[#f75b20]/10 text-[#f75b20] border-[#f75b20]/25" },
];

type TestimonialCardProps = {
  testimonial: Testimonial;
  index?: number;
};

export function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  const accent = accentColors[index % accentColors.length];
  const flag = getFlag(testimonial.destination);
  const initials = getInitials(testimonial.name);

  return (
    <article className="glass-panel group flex h-full min-h-80 flex-col justify-between rounded-[1.5rem] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(8,32,70,0.14)]">
      {/* Top row */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <Quote className="text-[#f75b20] shrink-0" size={26} />
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                className="fill-amber-400 text-amber-400"
              />
            ))}
          </div>
        </div>

        <p className="mt-5 text-base leading-8 text-slate-700">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      {/* Bottom row */}
      <div className="mt-6 border-t border-slate-900/8 pt-5">
        <div className="flex items-center gap-3">
          <div
            className={`grid size-11 shrink-0 place-items-center rounded-full border ${accent.border} ${accent.bg} font-display text-sm font-semibold ${accent.text}`}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-display text-base font-semibold text-slate-950 truncate">
              {testimonial.name}
            </p>
            <p className="mt-0.5 text-sm text-slate-500 truncate">
              {flag} {testimonial.destination}
            </p>
          </div>
        </div>

        <div
          className={`mt-4 rounded-xl border px-4 py-2.5 text-sm font-medium ${accent.badge}`}
        >
          ✓ {testimonial.result}
        </div>
      </div>
    </article>
  );
}
