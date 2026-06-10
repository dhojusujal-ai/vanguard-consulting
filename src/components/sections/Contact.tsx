"use client";

import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { destinations as defaultDestinations, pageSections, websiteSettings as defaultWebsiteSettings } from "@/data/site";
import type { Destination, InquiryPayload, PageSectionContent, WebsiteSettings } from "@/types";

const initialForm: InquiryPayload = {
  full_name: "",
  email: "",
  phone: "",
  destination: "Australia",
  preferred_date: "",
  preferred_time: "",
  counseling_mode: "Office visit",
  message: "",
};

export function Contact({
  destinations = defaultDestinations,
  settings = defaultWebsiteSettings,
  content = pageSections,
}: {
  destinations?: Destination[];
  settings?: WebsiteSettings;
  content?: PageSectionContent;
}) {
  const [form, setForm] = useState<InquiryPayload>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const updateField = (field: keyof InquiryPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result: { error?: string } = await response.json();

      if (!response.ok) {
        setStatus("error");
        setFeedback(result.error ?? "Unable to submit booking right now.");
        return;
      }

      setStatus("success");
      setFeedback("Booking request received. Our counselors will contact you shortly.");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setFeedback("Unable to submit booking right now. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow={content.contactEyebrow}
            title={content.contactTitle}
            description={content.contactDescription}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="flex items-start gap-4 rounded-2xl border border-slate-900/10 bg-white/60 p-5 shadow-[0_10px_30px_rgba(8,32,70,0.06)] backdrop-blur-sm">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#087ec3]/10 text-[#087ec3]">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Office Address</p>
                <p className="mt-1 text-sm font-medium text-slate-700">{settings.officeAddress}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-900/10 bg-white/60 p-5 shadow-[0_10px_30px_rgba(8,32,70,0.06)] backdrop-blur-sm">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#087ec3]/10 text-[#087ec3]">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Phone</p>
                <a href={`tel:${settings.contactPhone.split("/")[0]?.trim()}`} className="mt-1 block text-sm font-medium text-slate-700 transition hover:text-[#087ec3]">{settings.contactPhone}</a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-900/10 bg-white/60 p-5 shadow-[0_10px_30px_rgba(8,32,70,0.06)] backdrop-blur-sm">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#087ec3]/10 text-[#087ec3]">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Email</p>
                <a href={`mailto:${settings.contactEmail}`} className="mt-1 block text-sm font-medium text-slate-700 transition hover:text-[#087ec3]">{settings.contactEmail}</a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-900/10 bg-white/60 p-5 shadow-[0_10px_30px_rgba(8,32,70,0.06)] backdrop-blur-sm">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f75b20]/10 text-[#f75b20]">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Office Hours</p>
                <p className="mt-1 text-sm font-medium text-slate-700">{settings.officeHours}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-900/10 bg-white/60 p-5 shadow-[0_10px_30px_rgba(8,32,70,0.06)] backdrop-blur-sm sm:col-span-2 lg:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Destinations We Cover</p>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{content.contactDestinationSummary}</p>
            </div>
          </div>
        </div>

        <form
          id="book-appointment"
          onSubmit={handleSubmit}
          className="glass-panel glow-border scroll-mt-32 rounded-[2rem] p-5 md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-slate-600">Full name</span>
              <input
                suppressHydrationWarning
                required
                name="full_name"
                autoComplete="name"
                value={form.full_name}
                onChange={(event) => updateField("full_name", event.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#f75b20]/70"
                placeholder="Your name"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-slate-600">Email</span>
              <input
                suppressHydrationWarning
                required
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#f75b20]/70"
                placeholder="you@email.com"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-slate-600">Phone</span>
              <input
                suppressHydrationWarning
                required
                name="phone"
                autoComplete="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#f75b20]/70"
                placeholder="+977"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-slate-600">Destination</span>
              <select
                suppressHydrationWarning
                name="destination"
                value={form.destination}
                onChange={(event) => updateField("destination", event.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 text-slate-950 outline-none transition focus:border-[#f75b20]/70"
              >
                {destinations.map((destination) => (
                  <option key={destination.country} value={destination.country}>
                    {destination.country}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm text-slate-600">Preferred date</span>
              <input
                suppressHydrationWarning
                required
                type="date"
                name="preferred_date"
                value={form.preferred_date}
                onChange={(event) => updateField("preferred_date", event.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#f75b20]/70"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-slate-600">Preferred time</span>
              <input
                suppressHydrationWarning
                required
                type="time"
                name="preferred_time"
                value={form.preferred_time}
                onChange={(event) => updateField("preferred_time", event.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#f75b20]/70"
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm text-slate-600">Counseling type</span>
              <select
                suppressHydrationWarning
                required
                name="counseling_mode"
                value={form.counseling_mode}
                onChange={(event) => updateField("counseling_mode", event.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 text-slate-950 outline-none transition focus:border-[#f75b20]/70"
              >
                <option value="Office visit">Office visit</option>
                <option value="Phone call">Phone call</option>
                <option value="Online meeting">Online meeting</option>
              </select>
            </label>
          </div>

          <label className="mt-5 block space-y-2">
            <span className="text-sm text-slate-600">Message</span>
            <textarea
              suppressHydrationWarning
              required
              name="message"
              rows={6}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className="w-full resize-none rounded-2xl border border-slate-900/10 bg-white/70 p-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#f75b20]/70"
              placeholder="Current education, budget, intake, and questions for the counselor."
            />
          </label>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" size="lg" disabled={status === "loading"}>
              {status === "loading" ? "Booking..." : "Book Counseling"}
              <Send size={17} />
            </Button>
            {feedback && (
              <p
                className={
                  status === "success"
                    ? "text-sm font-medium text-[#087ec3]"
                    : "text-sm text-[#ff9aa0]"
                }
              >
                {feedback}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
