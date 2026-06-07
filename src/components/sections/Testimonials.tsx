"use client";

import { useRef, useEffect } from "react";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageSections, testimonials as defaultTestimonials } from "@/data/site";
import { getGsap } from "@/lib/gsap";
import type { PageSectionContent, Testimonial } from "@/types";

export function Testimonials({
  testimonials = defaultTestimonials,
  content = pageSections,
}: {
  testimonials?: Testimonial[];
  content?: PageSectionContent;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-testimonial-card]", {
        y: 40,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 76%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stories"
      ref={sectionRef}
      className="relative isolate overflow-hidden py-20 md:py-28"
    >
      {/* Background treatment */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_60%_0%,rgba(8,126,195,0.09),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(247,91,32,0.08),transparent_50%),linear-gradient(180deg,#f7fbff_0%,#ffffff_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#087ec3]/40 to-transparent" />

      <div className="section-shell">
        <SectionHeading
          eyebrow={content.testimonialsEyebrow}
          title={content.testimonialsTitle}
          description={content.testimonialsDescription}
          align="center"
        />

        {/* Stats bar */}
        <div className="mx-auto mt-10 flex flex-wrap justify-center gap-6 md:gap-10">
          {[
            { value: "2,000+", label: "Students Guided" },
            { value: "98%", label: "Visa Success Rate" },
            { value: "7", label: "Destinations Covered" },
            { value: "10+", label: "Years in Kathmandu" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-semibold text-slate-950">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.name} data-testimonial-card>
              <TestimonialCard testimonial={testimonial} index={index} />
            </div>
          ))}
        </div>

        {/* Trust note */}
        <p className="mt-8 text-center text-sm text-slate-400">
          Stories shared by students and families who worked with Vanguard Consulting, Kathmandu.
        </p>
      </div>
    </section>
  );
}
