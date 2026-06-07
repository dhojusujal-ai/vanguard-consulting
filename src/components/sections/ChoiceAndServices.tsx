"use client";

import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  HandCoins,
  Headphones,
  PlaneTakeoff,
  Search,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useRef } from "react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Button } from "@/components/ui/button";
import { pageSections } from "@/data/site";
import { getGsap } from "@/lib/gsap";
import type { PageSectionContent } from "@/types";

const iconMap = {
  BadgeCheck,
  FileCheck2,
  GraduationCap,
  HandCoins,
  Headphones,
  PlaneTakeoff,
  Search,
  UsersRound,
};

function updateGlow(
  event: React.PointerEvent<HTMLElement>,
  node: HTMLElement | null,
) {
  if (!node) {
    return;
  }

  const bounds = node.getBoundingClientRect();
  node.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
  node.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
}

export function ChoiceAndServices({ content = pageSections }: { content?: PageSectionContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [whyBefore, whyAfter = ""] = content.whyTitle.split(content.whyHighlight);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const { gsap } = getGsap();
    const context = gsap.context(() => {
      gsap.from("[data-premium-reveal]", {
        y: 42,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 74%",
        },
      });

      gsap.from("[data-journey-step]", {
        y: 34,
        opacity: 0,
        scale: 0.92,
        duration: 0.75,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-journey-row]",
          start: "top 80%",
        },
      });

      gsap.fromTo(
        "[data-flow-line]",
        { strokeDashoffset: 90 },
        {
          strokeDashoffset: 0,
          duration: 2.8,
          repeat: -1,
          ease: "none",
        },
      );

    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="relative isolate overflow-hidden py-20 text-slate-950 md:py-24"
      onPointerMove={(event) => updateGlow(event, sectionRef.current)}
      style={
        {
          "--glow-x": "50%",
          "--glow-y": "18%",
        } as CSSProperties
      } 
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_var(--glow-x)_var(--glow-y),rgba(8,126,195,0.16),transparent_26rem),radial-gradient(circle_at_88%_10%,rgba(237,28,36,0.13),transparent_27rem),radial-gradient(circle_at_76%_45%,rgba(247,91,32,0.11),transparent_26rem),linear-gradient(180deg,#ffffff_0%,#f4f8ff_45%,#ffffff_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(8,126,195,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(237,28,36,0.04)_1px,transparent_1px)] bg-[size:58px_58px] opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" />

      <div className="section-shell">
        <div className="mx-auto max-w-4xl text-center">
          <h2 data-premium-reveal className="font-display mt-5 text-balance text-4xl font-semibold leading-tight md:text-6xl">
            {whyBefore}
            <span className="bg-gradient-to-r from-[#087ec3] via-[#ed1c24] to-[#f75b20] bg-clip-text text-transparent">
              {content.whyHighlight}
            </span>
            {whyAfter}
          </h2>
          <p data-premium-reveal className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            {content.whyDescription}
          </p>
          <div data-premium-reveal className="mt-6 flex flex-wrap justify-center gap-3">
            {content.whyPoints.map((point) => (
              <span
                key={point}
                className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/72 px-4 py-2 text-sm font-semibold text-slate-600 shadow-[0_10px_30px_rgba(8,32,70,0.07)] backdrop-blur-xl"
              >
                <CheckCircle2 size={16} className="text-[#087ec3]" />
                {point}
              </span>
            ))}
          </div>
        </div>

        <div data-card-grid className="relative mt-8">
          <svg className="pointer-events-none absolute inset-x-0 bottom-12 -z-10 hidden h-28 w-full opacity-45 xl:block" viewBox="0 0 1180 112" fill="none" aria-hidden="true">
            <path data-flow-line d="M98 16V54C98 80 118 92 144 92H514C548 92 560 64 590 64C620 64 632 92 666 92H1036C1062 92 1082 80 1082 54V16" stroke="url(#whyCardsLine)" strokeWidth="2" strokeDasharray="7 8" />
            <path data-flow-line d="M294 16V54C294 80 314 92 340 92H514M490 92C532 92 548 64 590 64C632 64 648 92 690 92M840 16V54C840 80 860 92 886 92" stroke="url(#whyCardsLine)" strokeWidth="2" strokeDasharray="7 8" opacity="0.75" />
            <defs>
              <linearGradient id="whyCardsLine" x1="98" x2="1082" y1="64" y2="64">
                <stop stopColor="#087ec3" />
                <stop offset="0.5" stopColor="#ed1c24" />
                <stop offset="1" stopColor="#f75b20" />
              </linearGradient>
            </defs>
          </svg>
          <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {content.whyReasons.map((reason, index) => {
            const Icon = iconMap[reason.icon as keyof typeof iconMap] ?? UsersRound;

            return (
              <article
                key={reason.title}
                data-reason-card
                className="group relative z-10 min-h-64 overflow-hidden rounded-[1.1rem] border border-slate-900/10 bg-white p-5 text-center opacity-100 shadow-[0_18px_60px_rgba(8,32,70,0.09)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:rotate-[0.6deg] hover:border-[var(--card-accent)] hover:bg-white hover:shadow-[0_28px_90px_rgba(8,126,195,0.16)] xl:min-h-68 xl:p-4"
                style={{ "--card-accent": reason.accent } as CSSProperties}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,color-mix(in_srgb,var(--card-accent)_12%,transparent),transparent_9rem)]" />
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--card-accent)] to-transparent opacity-80" />
                <span className="font-display absolute right-4 top-4 text-3xl font-semibold text-slate-900/[0.055]">
                  0{index + 1}
                </span>
                <div className="relative mx-auto grid size-15 place-items-center rounded-full border border-slate-900/10 bg-white text-slate-950 shadow-[0_0_30px_color-mix(in_srgb,var(--card-accent)_34%,transparent)] transition duration-300 group-hover:scale-110 group-hover:rotate-6 xl:size-14">
                  <Icon size={23} />
                </div>
                <h3 className="font-display relative mt-6 text-xl font-semibold leading-tight text-slate-950 xl:text-base">
                  {reason.title}
                </h3>
                <p className="relative mt-3 text-sm leading-6 text-slate-600 xl:text-[0.78rem] xl:leading-5">
                  {reason.description}
                </p>
                {reason.stat ? (
                  <div className="absolute bottom-3 right-3 grid size-12 place-items-center rounded-full border-[5px] border-[#087ec3] border-r-[#ed1c24] border-t-[#f75b20] bg-white font-display text-xs font-semibold shadow-[0_0_30px_rgba(8,126,195,0.24)]">
                    {reason.stat}
                  </div>
                ) : null}
              </article>
            );
          })}
          </div>
          <div data-premium-reveal className="relative z-10 mx-auto mt-6 grid size-24 place-items-center rounded-full border border-slate-900/10 bg-white shadow-[0_0_44px_rgba(8,126,195,0.24)]">
            <Image
              src="/logo.png"
              alt="Vanguard Consulting mark"
              width={68}
              height={68}
              className="h-auto w-auto object-contain"
            />
          </div>
          <div data-premium-reveal className="mt-5 flex flex-wrap items-center justify-center gap-4 text-base text-slate-500">
            <span>Your Dream.</span>
            <span className="h-4 w-px bg-slate-300" />
            <span className="font-semibold text-[#087ec3]">Our Guidance.</span>
            <span className="h-4 w-px bg-slate-300" />
            <span>A Global Future.</span>
          </div>
        </div>

        <div data-premium-reveal className="my-12 overflow-hidden rounded-[1.75rem] border border-slate-900/10 bg-white/72 p-3 shadow-[0_28px_90px_rgba(8,32,70,0.12)] backdrop-blur-xl">
          <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div className="relative min-h-72 overflow-hidden rounded-[1.35rem] bg-white">
              <Image
                src="/counselling-people.svg"
                alt="Students receiving counselling from an education consultant"
                fill
                sizes="(min-width: 768px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-4 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ed1c24]">
                {content.personalEyebrow}
              </p>
              <h3 className="font-display mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                {content.personalTitle}
              </h3>
              <p className="mt-4 max-w-xl leading-7 text-slate-600">
                {content.personalDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div data-premium-reveal className="flex items-center justify-center gap-4 text-sm font-semibold uppercase tracking-[0.34em] text-[#087ec3]">
            <span className="h-px w-8 bg-[#087ec3]" />
            {content.journeyEyebrow}
            <span className="h-px w-8 bg-[#087ec3]" />
          </div>
          <h3 data-premium-reveal className="font-display mt-4 text-3xl font-semibold md:text-4xl">
            {content.journeyTitle}
          </h3>
          <p data-premium-reveal className="mt-3 text-slate-600">
            {content.journeyDescription}
          </p>
        </div>

        <div data-journey-row className="relative mt-9 grid gap-6 md:grid-cols-5">
          <div className="absolute left-[9%] right-[9%] top-10 hidden h-px bg-gradient-to-r from-[#087ec3] via-[#ed1c24] to-[#f75b20] md:block" />
          {content.journeySteps.map((step, index) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap] ?? UsersRound;

            return (
              <div
                key={step.title}
                data-journey-step
                className="relative text-center"
                style={{ "--card-accent": step.accent } as CSSProperties}
              >
                <div className="relative mx-auto grid size-20 place-items-center rounded-full border border-[var(--card-accent)] bg-white text-slate-950 shadow-[0_0_34px_color-mix(in_srgb,var(--card-accent)_30%,transparent)] transition duration-300 hover:-translate-y-1 hover:scale-105">
                  <Icon size={28} />
                  {index < content.journeySteps.length - 1 ? (
                    <span className="absolute -right-5 top-1/2 hidden size-6 -translate-y-1/2 place-items-center rounded-full bg-[#087ec3] text-xs text-white md:grid">
                      <ArrowRight size={13} />
                    </span>
                  ) : null}
                </div>
                <p className="font-display mt-4 text-sm font-semibold text-[#087ec3]">
                  0{index + 1}
                </p>
                <h4 className="font-display mt-1 text-base font-semibold">{step.title}</h4>
                <p className="mx-auto mt-2 max-w-44 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div data-premium-reveal className="mt-10 overflow-hidden rounded-[1.25rem] border border-slate-900/10 bg-white/72 p-5 shadow-[0_20px_70px_rgba(8,32,70,0.11)] backdrop-blur-xl">
          <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="grid size-20 place-items-center rounded-full border border-[#087ec3]/70 bg-[#087ec3]/10 text-slate-950 shadow-[0_0_34px_rgba(8,126,195,0.22)]">
              <CheckCircle2 size={34} />
            </div>
            <div>
              <h4 className="font-display text-2xl font-semibold">
                {content.journeyCtaTitle}
              </h4>
              <p className="mt-2 text-slate-600">
                {content.journeyCtaDescription}
              </p>
            </div>
            <MagneticButton className="inline-flex">
              <Button asChild size="lg">
                <Link href="/#book-appointment">
                  {content.journeyCtaLabel}
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
