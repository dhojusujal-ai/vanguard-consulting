"use client";

import { BriefcaseBusiness, Mail, UserRound } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { pageSections, teamMembers as defaultTeamMembers } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PageSectionContent, TeamMember } from "@/types";

type DisplayTeamMember = {
  name: string;
  role: string;
  focus: string;
  initials: string;
  social: string;
  photo?: string;
  status?: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function isPreviewableImage(value = "") {
  const source = value.trim();

  return (
    source.startsWith("/") ||
    source.startsWith("data:image") ||
    source.startsWith("http://") ||
    source.startsWith("https://")
  );
}

function imageBackground(value: string) {
  return `url("${value.replace(/"/g, '\\"')}")`;
}

export function Team({
  members = defaultTeamMembers,
  content = pageSections,
}: {
  members?: Array<TeamMember & { photo?: string }>;
  content?: PageSectionContent;
}) {
  const displayMembers: DisplayTeamMember[] = members
    .filter((member) => member.status !== "Draft")
    .map((member) => ({
      ...member,
      focus: member.focus || member.role,
      initials: member.initials || getInitials(member.name),
    }));

  return (
    <section id="team" className="relative py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow={content.teamEyebrow}
          title={content.teamTitle}
          description={content.teamDescription}
          align="center"
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {displayMembers.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.06}>
              <article className="rounded-[1.5rem] border border-slate-900/10 bg-white/72 p-6 text-center shadow-[0_18px_55px_rgba(8,32,70,0.08)] backdrop-blur-xl">
                {isPreviewableImage(member.photo) ? (
                  <div
                    aria-label={`${member.name} photo`}
                    className="mx-auto size-24 rounded-2xl border border-[#087ec3]/20 bg-white bg-cover bg-center shadow-[0_16px_42px_rgba(8,32,70,0.12)]"
                    style={{ backgroundImage: imageBackground(member.photo ?? "") }}
                  />
                ) : (
                  <div className="mx-auto grid size-20 place-items-center rounded-2xl border border-[#087ec3]/20 bg-[#087ec3]/10 font-display text-2xl font-semibold text-[#087ec3]">
                    {member.initials}
                  </div>
                )}
                <h3 className="font-display mt-6 text-2xl font-semibold text-slate-950">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#f75b20]">
                  {member.role}
                </p>
                <p className="mt-4 leading-7 text-slate-600">{member.focus}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {member.social}
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  <span className="grid size-10 place-items-center rounded-full border border-slate-900/10 bg-white text-slate-600">
                    <Mail size={17} />
                  </span>
                  <span className="grid size-10 place-items-center rounded-full border border-slate-900/10 bg-white text-slate-600">
                    <BriefcaseBusiness size={17} />
                  </span>
                  <span className="grid size-10 place-items-center rounded-full border border-slate-900/10 bg-white text-slate-600">
                    <UserRound size={17} />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
