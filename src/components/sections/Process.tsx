import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageSections, timeline as defaultTimeline } from "@/data/site";
import type { PageSectionContent, TimelineStep } from "@/types";

export function Process({
  timeline = defaultTimeline,
  content = pageSections,
}: {
  timeline?: TimelineStep[];
  content?: PageSectionContent;
}) {
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow={content.processEyebrow}
          title={content.processTitle}
          description={content.processDescription}
          align="center"
        />

        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-[#087ec3]/0 via-[#087ec3]/70 to-[#ed1c24]/0 md:block" />
          <div className="space-y-5">
            {timeline.map((step, index) => (
              <Reveal key={step.phase} delay={index * 0.05}>
                <article className="relative grid gap-5 rounded-[1.75rem] border border-slate-900/10 bg-white/68 p-5 shadow-[0_18px_55px_rgba(8,32,70,0.08)] backdrop-blur-xl md:grid-cols-[5rem_1fr] md:p-7">
                  <div className="grid h-11 w-11 place-items-center rounded-full border border-[#087ec3]/34 bg-[#087ec3]/12 font-display text-sm font-semibold text-[#9fd8ff] shadow-[0_0_26px_rgba(8,126,195,0.25)]">
                    {step.phase}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-slate-950">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-600">{step.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
