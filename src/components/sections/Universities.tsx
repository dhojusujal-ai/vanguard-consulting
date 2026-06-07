import { Building2, CalendarDays, GraduationCap, Landmark, WalletCards } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { pageSections, universities as defaultUniversities } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PageSectionContent, UniversityProfile } from "@/types";

export function Universities({
  universities = defaultUniversities,
  content = pageSections,
}: {
  universities?: UniversityProfile[];
  content?: PageSectionContent;
}) {
  return (
    <section id="universities" className="relative py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow={content.universitiesEyebrow}
          title={content.universitiesTitle}
          description={content.universitiesDescription}
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {universities.map((university, index) => (
            <Reveal key={university.name} delay={index * 0.05}>
              <article className="rounded-[1.35rem] border border-slate-900/10 bg-white/70 p-5 shadow-[0_18px_55px_rgba(8,32,70,0.08)] backdrop-blur-xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-xl bg-[#087ec3]/10 text-[#087ec3]">
                        <Building2 size={21} />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-slate-950">
                          {university.name}
                        </h3>
                        <p className="text-sm font-medium text-slate-500">{university.country}</p>
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full border border-[#f75b20]/20 bg-[#f75b20]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#b53b0e]">
                    {university.ranking}
                  </span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-900/10 bg-white/74 p-4">
                    <WalletCards className="text-[#087ec3]" size={18} />
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Tuition</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">{university.tuition}</p>
                  </div>
                  <div className="rounded-xl border border-slate-900/10 bg-white/74 p-4">
                    <CalendarDays className="text-[#ed1c24]" size={18} />
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Intake</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">{university.intake}</p>
                  </div>
                  <div className="rounded-xl border border-slate-900/10 bg-white/74 p-4">
                    <GraduationCap className="text-[#f75b20]" size={18} />
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Requirements</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">{university.requirements}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-slate-900/10 bg-white/62 p-5 text-sm leading-6 text-slate-600">
          <Landmark className="mb-3 text-[#087ec3]" size={20} />
          {content.universitiesNote}
        </div>
      </div>
    </section>
  );
}
