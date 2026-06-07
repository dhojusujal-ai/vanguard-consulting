import Link from "next/link";
import { ClipboardCheck, FileUp, History, UserRoundCheck } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageSections } from "@/data/site";
import type { PageSectionContent } from "@/types";

const iconMap = {
  ClipboardCheck,
  FileUp,
  History,
  UserRoundCheck,
};

export function ApplicationSupport({ content = pageSections }: { content?: PageSectionContent }) {
  return (
    <section id="applications" className="relative py-20 md:py-28">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow={content.applicationEyebrow}
                title={content.applicationTitle}
                description={content.applicationDescription}
              />
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/#book-appointment">{content.applicationCtaLabel}</Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {content.applicationSteps.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap] ?? FileUp;

              return (
                <Reveal key={step.title} delay={index * 0.06}>
                  <article className="min-h-56 rounded-[1.35rem] border border-slate-900/10 bg-white/70 p-5 shadow-[0_18px_55px_rgba(8,32,70,0.08)] backdrop-blur-xl">
                    <span className="grid size-12 place-items-center rounded-xl border border-[#087ec3]/20 bg-[#087ec3]/10 text-[#087ec3]">
                      <Icon size={22} />
                    </span>
                    <h3 className="font-display mt-6 text-xl font-semibold text-slate-950">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
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
