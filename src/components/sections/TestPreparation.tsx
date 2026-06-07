"use client";

import { BookOpen, CalendarCheck2, CheckCircle2, Headphones, MessageCircle, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageSections } from "@/data/site";
import type { PageSectionContent } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Headphones,
  MessageCircle,
  CalendarCheck2,
};

export function TestPreparation({ content = pageSections }: { content?: PageSectionContent }) {
  return (
    <section
      id="test-prep"
      className="relative isolate overflow-hidden bg-white py-16 md:py-20"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_48%,#fff7f2_100%)]" />
      <div className="absolute left-0 right-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#087ec3]/55 to-transparent" />

      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow={content.testPrepEyebrow}
                title={content.testPrepTitle}
                description={content.testPrepDescription}
              />
              <div className="mt-7 flex flex-wrap gap-3">
                {["IELTS", "PTE", "Mock tests", "Score planning"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-[0_10px_30px_rgba(8,32,70,0.07)]"
                  >
                    <CheckCircle2 size={16} className="text-[#087ec3]" />
                    {item}
                  </span>
                ))}
              </div>
              <Link
                href="/#book-appointment"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(8,32,70,0.18)] transition hover:bg-[#f75b20]"
              >
                {content.testPrepCtaLabel}
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {content.testPrepClasses.map((classItem, index) => {
              const Icon = iconMap[classItem.icon] ?? BookOpen;

              return (
                <Reveal key={`${classItem.title}-${index}`} delay={index * 0.08}>
                  <article className="relative min-h-80 overflow-hidden rounded-[1.1rem] border border-slate-900/10 bg-white p-6 shadow-[0_22px_70px_rgba(8,32,70,0.12)]">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#087ec3] via-[#ed1c24] to-[#f75b20]" />
                    <div className="grid size-14 place-items-center rounded-2xl border border-[#087ec3]/25 bg-[#087ec3]/10 text-[#087ec3]">
                      <Icon size={26} />
                    </div>
                    <h3 className="font-display mt-6 text-2xl font-semibold leading-tight text-slate-950">
                      {classItem.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      {classItem.description}
                    </p>
                    <div className="mt-6 rounded-xl border border-slate-900/10 bg-slate-50 p-4 text-sm font-medium leading-6 text-slate-700">
                      {classItem.detail}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
