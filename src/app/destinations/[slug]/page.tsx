import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Home,
  MapPin,
} from "lucide-react";
import { CosmicBackground } from "@/components/background/CosmicBackground";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { destinationDetails } from "@/data/site";
import { getSiteContent } from "@/lib/database";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

const countryFlags: Record<string, string> = {
  australia: "/flags/australia.svg",
  canada: "/flags/canada.svg",
  "united-kingdom": "/flags/united-kingdom.svg",
  "united-states": "/flags/united-states.svg",
  india: "/flags/india.svg",
  bangladesh: "/flags/bangladesh.svg",
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return destinationDetails.map((destination) => ({
    slug: destination.slug,
  }));
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getSiteContent();
  const destination = content.destinationDetails.find((item) => item.slug === slug);

  if (!destination) {
    return {};
  }

  return {
    title: `Study in ${destination.country}`,
    description: `${destination.country} study pathway information, colleges, visa guidance, work options, and application support from Vanguard Consulting.`,
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const content = await getSiteContent();
  const destination = content.destinationDetails.find((item) => item.slug === slug);

  if (!destination) {
    notFound();
  }

  const flagSrc = countryFlags[destination.slug];

  return (
    <>
      <CosmicBackground />
      <Navbar />
      <main className="relative z-10">
        <section className="relative overflow-hidden px-4 pb-20 pt-36 md:pt-40">
          <div className="section-shell">
            <Link
              href="/#destinations"
              className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 shadow-[0_12px_36px_rgba(8,32,70,0.08)] backdrop-blur-xl transition hover:border-[#087ec3]/40 hover:text-slate-950"
            >
              <ArrowLeft size={16} />
              Back to destinations
            </Link>

            <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#087ec3]">
                  {destination.code} pathway
                </p>
                <h1 className="font-display mt-5 text-balance text-5xl font-semibold leading-tight text-slate-950 md:text-7xl">
                  Study in{" "}
                  <span className="bg-gradient-to-r from-[#087ec3] via-[#ed1c24] to-[#f75b20] bg-clip-text text-transparent">
                    {destination.country}
                  </span>
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                  {destination.hero}
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/#book-appointment">
                      Start Counseling
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                  <Button asChild variant="glass" size="lg">
                    <Link href="/#destinations">
                      Explore More Countries
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {flagSrc ? (
                  <div className="glass-panel relative overflow-hidden rounded-[1.5rem] p-5">
                    <div
                      className="absolute inset-0 opacity-12"
                      style={{ backgroundColor: destination.accent }}
                    />
                    <div className="relative grid gap-5 sm:grid-cols-[11rem_1fr] sm:items-center md:grid-cols-[13rem_1fr]">
                      <div className="relative aspect-[3/2] overflow-hidden rounded-[1rem] border border-slate-900/10 bg-white p-3 shadow-[0_18px_45px_rgba(8,32,70,0.14)]">
                        <Image
                          src={flagSrc}
                          alt={`${destination.country} flag`}
                          fill
                          priority
                          sizes="(min-width: 768px) 208px, 176px"
                          className="object-contain p-2"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#087ec3]">
                          Country Guide
                        </p>
                        <p className="font-display mt-2 text-3xl font-semibold text-slate-950">
                          {destination.country}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          A quick visual marker for the study pathway you are
                          viewing.
                        </p>
                      </div>
                    </div>
                    <span className="absolute right-5 top-5 rounded-full border border-slate-900/10 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-[0_10px_28px_rgba(8,32,70,0.08)]">
                      {destination.code}
                    </span>
                  </div>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ["Popular City", destination.city],
                    ["Visa Route", destination.visa],
                    ["Intakes", destination.intake],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="glass-panel rounded-[1.25rem] p-5"
                    >
                      <p className="text-sm text-slate-500">{label}</p>
                      <p className="font-display mt-3 text-2xl font-semibold text-slate-950">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-4 pb-24">
          <div className="section-shell grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <InfoPanel
              eyebrow="Why Study Here"
              title={`${destination.country} can be a smart fit when your course, budget, and career plan align.`}
              icon={GraduationCap}
              items={destination.whyStudy}
            />
            <InfoPanel
              eyebrow="Colleges & Universities"
              title="Institutions students commonly compare during shortlisting."
              icon={Building2}
              items={destination.colleges}
              columns
            />
          </div>

          <div className="section-shell mt-6 grid gap-6 lg:grid-cols-3">
            <InfoPanel
              eyebrow="Work Options"
              title={`Part-time work students can explore in ${destination.country}.`}
              icon={BriefcaseBusiness}
              items={destination.work}
            />
            <InfoPanel
              eyebrow="Application Path"
              title="How Vanguard Consulting guides the process."
              icon={ClipboardList}
              items={destination.pathway}
            />
            <div className="glass-panel rounded-[1.5rem] p-6">
              <div className="grid size-12 place-items-center rounded-2xl border border-[#f75b20]/25 bg-[#f75b20]/10 text-[#f75b20]">
                <Home size={24} />
              </div>
              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.24em] text-[#ed1c24]">
                Living & Planning
              </p>
              <h2 className="font-display mt-3 text-2xl font-semibold leading-tight text-slate-950">
                Budget, city, and lifestyle need to be planned early.
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                {destination.living}
              </p>
              <div className="mt-6 flex items-center gap-2 rounded-2xl border border-slate-900/10 bg-white/62 p-4 text-sm text-slate-600">
                <MapPin size={17} className="text-[#087ec3]" />
                We help compare locations before you commit.
              </div>
            </div>
          </div>

          <div className="section-shell mt-8 overflow-hidden rounded-[1.5rem] border border-slate-900/10 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(8,32,70,0.16)] md:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex items-center gap-2 text-[#7fc9ff]">
                  <BadgeCheck size={20} />
                  <span className="text-sm font-semibold uppercase tracking-[0.24em]">
                    Vanguard Support
                  </span>
                </div>
                <h2 className="font-display mt-4 text-3xl font-semibold">
                  Want a clear {destination.country} plan?
                </h2>
                <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                  We can review your academics, budget, work goals, documents,
                  and timeline before you apply.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/#book-appointment">
                  Book Counseling
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={content.websiteSettings} content={content.pageSections} />
    </>
  );
}

type InfoPanelProps = {
  eyebrow: string;
  title: string;
  icon: typeof GraduationCap;
  items: string[];
  columns?: boolean;
};

function InfoPanel({
  eyebrow,
  title,
  icon: Icon,
  items,
  columns = false,
}: InfoPanelProps) {
  return (
    <div className="glass-panel rounded-[1.5rem] p-6">
      <div className="grid size-12 place-items-center rounded-2xl border border-[#087ec3]/25 bg-[#087ec3]/10 text-[#087ec3]">
        <Icon size={24} />
      </div>
      <p className="mt-7 text-sm font-semibold uppercase tracking-[0.24em] text-[#ed1c24]">
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-2xl font-semibold leading-tight text-slate-950">
        {title}
      </h2>
      <div className={`mt-6 grid gap-3 ${columns ? "sm:grid-cols-2" : ""}`}>
        {items.map((item) => (
          <div
            key={item}
            className="flex gap-3 rounded-2xl border border-slate-900/10 bg-white/62 p-4 text-sm leading-6 text-slate-600"
          >
            <CheckCircle2 className="mt-0.5 shrink-0 text-[#087ec3]" size={17} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
