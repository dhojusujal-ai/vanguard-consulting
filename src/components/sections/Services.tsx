"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageSections, services as defaultServices } from "@/data/site";
import { getGsap } from "@/lib/gsap";
import type { EditableServiceContent, PageSectionContent } from "@/types";

const serviceIcons = defaultServices.map((service) => service.icon);

export function Services({
  services = defaultServices,
  content = pageSections,
}: {
  services?: EditableServiceContent[];
  content?: PageSectionContent;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;

    if (!section) {
      return;
    }

    const { gsap } = getGsap();
    const context = gsap.context(() => {
      gsap.from("[data-service-panel]", {
        y: 32,
        stagger: 0.08,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 76%",
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      id="services"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#eef6ff] py-16 md:py-20"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(8,126,195,0.18),rgba(255,255,255,0.96)_34%,rgba(247,91,32,0.14)_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#087ec3] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#f75b20] to-transparent" />

      <div className="section-shell relative">
        <Reveal>
          <SectionHeading
            eyebrow={content.servicesEyebrow}
            title={content.servicesTitle}
            description={content.servicesDescription}
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.filter((service) => service.status !== "Draft").map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];

            return (
              <article
                key={service.title}
                data-service-panel
                className="group relative min-h-58 overflow-hidden rounded-[1.1rem] border border-slate-900/15 bg-white p-5 shadow-[0_18px_48px_rgba(8,32,70,0.16)] transition duration-300 hover:-translate-y-1.5 hover:border-[#f75b20]/60 hover:shadow-[0_24px_65px_rgba(8,32,70,0.18)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#087ec3] via-[#ed1c24] to-[#f75b20]" />
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#087ec3]/35 bg-[#087ec3]/12 text-[#087ec3] transition group-hover:border-[#f75b20]/50 group-hover:bg-[#f75b20]/10 group-hover:text-[#ed1c24]">
                  <Icon size={24} />
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold leading-tight text-slate-950">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 rounded-[1.25rem] border border-slate-900/15 bg-slate-950 p-6 text-white shadow-[0_24px_70px_rgba(8,32,70,0.2)] md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9fd8ff]">
              {content.servicesCtaEyebrow}
            </p>
            <h3 className="font-display mt-3 text-2xl font-semibold md:text-3xl">
              {content.servicesCtaTitle}
            </h3>
            <p className="mt-3 max-w-3xl leading-7 text-slate-300">
              {content.servicesCtaDescription}
            </p>
          </div>
          <Link
            href="/#book-appointment"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-[#f75b20] hover:text-white"
          >
            {content.servicesCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
