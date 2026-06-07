import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { navItems, pageSections, websiteSettings as defaultWebsiteSettings } from "@/data/site";
import type { PageSectionContent, WebsiteSettings } from "@/types";

const serviceLinks = [
  { label: "Career Counseling", href: "/#why-choose-us" },
  { label: "University Shortlisting", href: "/#services" },
  { label: "Application & Docs", href: "/#services" },
  { label: "Visa Guidance", href: "/#services" },
  { label: "Scholarship Assistance", href: "/#services" },
  { label: "IELTS & PTE Classes", href: "/#test-prep" },
];

const destinationLinks = [
  { label: "Study in Australia", href: "/#destinations" },
  { label: "Study in Canada", href: "/#destinations" },
  { label: "Study in UK", href: "/#destinations" },
  { label: "Study in USA", href: "/#destinations" },
  { label: "Study in India", href: "/#destinations" },
  { label: "Study in Bangladesh", href: "/#destinations" },
];

export function Footer({
  settings = defaultWebsiteSettings,
  content = pageSections,
}: {
  settings?: WebsiteSettings;
  content?: PageSectionContent;
}) {
  return (
    <footer className="relative border-t border-slate-900/10 bg-slate-950 text-slate-300">
      {/* Top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#087ec3] to-transparent" />

      <div className="section-shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Vanguard Consulting logo"
                width={160}
                height={160}
                className="h-auto w-auto rounded-xl object-contain"
              />
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              {content.footerDescription}
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3 text-sm">
              <a
                href={`tel:${settings.contactPhone.split("/")[0]?.trim()}`}
                className="flex items-center gap-2.5 text-slate-400 transition hover:text-white"
              >
                <Phone size={15} className="shrink-0 text-[#087ec3]" />
                {settings.contactPhone}
              </a>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="flex items-center gap-2.5 text-slate-400 transition hover:text-white"
              >
                <Mail size={15} className="shrink-0 text-[#087ec3]" />
                {settings.contactEmail}
              </a>
              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[#087ec3]" />
                {settings.officeAddress}
              </div>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {[
                { icon: "f", label: "Facebook", href: "#" },
                { icon: "in", label: "Instagram", href: "#" },
                { icon: "li", label: "LinkedIn", href: "#" },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-white/10 font-display text-xs font-bold text-slate-400 transition hover:border-[#087ec3]/50 hover:bg-[#087ec3]/10 hover:text-white"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Our Services
            </h3>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Study Destinations
            </h3>
            <ul className="mt-5 space-y-3">
              {destinationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links + CTA */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA box */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">
                Free counseling session
              </p>
              <p className="mt-1.5 text-xs leading-5 text-slate-400">
                Talk to a Vanguard counselor at our Kathmandu office or online — no fees, no pressure.
              </p>
              <Link
                href="/#book-appointment"
                className="mt-4 inline-flex h-9 items-center justify-center rounded-full bg-[#087ec3] px-5 text-xs font-semibold text-white transition hover:bg-[#f75b20]"
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/8 pt-8 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>&copy; {content.footerCopyright}</p>
          <p className="flex items-center gap-1.5">
            <MapPin size={12} className="text-[#087ec3]" />
            {content.footerTagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
