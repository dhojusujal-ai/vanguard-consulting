"use client";

import { ArrowRight, Play, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Button } from "@/components/ui/button";
import { pageSections } from "@/data/site";
import { getGsap } from "@/lib/gsap";
import type { PageSectionContent } from "@/types";

export function Hero({ content = pageSections }: { content?: PageSectionContent }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const { gsap } = getGsap();
    const context = gsap.context(() => {
      gsap.from("[data-hero-reveal]", {
        y: 80,
        opacity: 0,
        filter: "blur(14px)",
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-32 md:pt-28"
    >
      <div className="hero-plane-background" aria-hidden="true">
        <div className="hero-plane">
          <Image
            src="/plane-cutout.png"
            alt=""
            width={1035}
            height={838}
            priority
            className="hero-plane-image h-auto w-full object-contain"
          />
        </div>
      </div>
      <div className="section-shell relative z-10 grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="relative z-10">
         

          <h1
            data-hero-reveal
            className="font-display text-balance text-4xl font-semibold leading-tight text-slate-950 md:text-5xl lg:text-6xl"
          >
            {content.heroTitle}
            <span className="block bg-gradient-to-r from-[#087ec3] via-[#ed1c24] to-[#f75b20] bg-clip-text text-transparent">
              {content.heroHighlight}
            </span>
          </h1>

          <p
            data-hero-reveal
            className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg"
          >
            {content.heroDescription}
          </p>

          <div data-hero-reveal className="mt-10 flex flex-col gap-4 sm:flex-row">
            <MagneticButton>
              <Button asChild size="lg">
                <Link href="/#book-appointment">
                  {content.heroPrimaryCta}
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </MagneticButton>
            <Button asChild variant="glass" size="lg">
              <Link href="#destinations">
                <Play size={17} />
                {content.heroSecondaryCta}
              </Link>
            </Button>
          </div>

          <div data-hero-reveal className="mt-12 flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-[#7fc9ff]" />
              {content.heroBadgeOne}
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-[#ff8a3d]" />
              {content.heroBadgeTwo}
            </span>
          </div>
        </div>

        <div className="relative min-h-[31rem] lg:min-h-[42rem]">
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-[#087ec3]/14 via-[#ed1c24]/10 to-[#f75b20]/14 blur-3xl" />
          <div className="relative h-full min-h-[31rem] overflow-hidden rounded-[2.5rem] border border-slate-900/10 bg-white/72 p-3 shadow-[0_28px_90px_rgba(8,32,70,0.14)] backdrop-blur-xl lg:min-h-[42rem]">
            <Image
              src={content.heroImage}
              alt="Vanguard Consulting abroad study poster"
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
