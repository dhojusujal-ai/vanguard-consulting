import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarCheck,
  Clock3,
  FileSearch,
  GraduationCap,
  Landmark,
  Newspaper,
  ShieldCheck,
} from "lucide-react";
import { CosmicBackground } from "@/components/background/CosmicBackground";
import { GlowCursor } from "@/components/cursor/GlowCursor";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { getSiteContent } from "@/lib/database";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Study abroad articles, destination updates, visa planning notes, and education guidance from Vanguard Consulting.",
};

export default async function BlogPage() {
  const content = await getSiteContent();
  const posts = content.blogPosts;
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);
  const topPriorities = [
    {
      title: "Deadlines are moving earlier",
      description: "Shortlist destinations, intakes, tests, and document work before the rush.",
      icon: CalendarCheck,
    },
    {
      title: "Financial proof needs clarity",
      description: "Sponsors, source of funds, tuition, and living budgets should tell one clean story.",
      icon: Landmark,
    },
    {
      title: "Career logic matters",
      description: "Program choice should connect to your academic history and future employment path.",
      icon: GraduationCap,
    },
    {
      title: "Visa files need consistency",
      description: "SOP, application forms, academic records, and interview answers must align.",
      icon: ShieldCheck,
    },
  ];
  const visitorNeeds = [
    "Country comparison",
    "Visa documentation",
    "Scholarship planning",
    "SOP and interview clarity",
  ];

  return (
    <>
      <CosmicBackground />
      <GlowCursor />
      <Navbar />
      <main className="relative z-10">
        <section className="relative overflow-hidden px-4 pb-12 pt-32 md:pb-16 md:pt-36">
          <div className="section-shell">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 shadow-[0_12px_36px_rgba(8,32,70,0.08)] backdrop-blur-xl transition hover:border-[#087ec3]/40 hover:text-slate-950"
            >
              <ArrowLeft size={16} />
              Back home
            </Link>

            <div className="mt-8 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#087ec3]">
                  {content.pageSections.blogEyebrow}
                </p>
                <h1 className="font-display mt-5 text-balance text-5xl font-semibold leading-tight text-slate-950 md:text-6xl lg:text-7xl">
                  {content.pageSections.blogTitle}
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                  {content.pageSections.blogDescription}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  {visitorNeeds.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 shadow-[0_10px_30px_rgba(8,32,70,0.07)] backdrop-blur-xl"
                    >
                      <BadgeCheck size={15} className="text-[#087ec3]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[28rem] overflow-hidden rounded-[1.5rem] border border-slate-900/10 bg-slate-950 shadow-[0_28px_90px_rgba(8,32,70,0.16)]">
                <Image
                  src="/poster.jpeg"
                  alt="Vanguard Consulting study abroad advisory"
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover opacity-64"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/58 to-slate-950/12" />
                <div className="relative flex h-full min-h-[28rem] flex-col justify-end p-6 text-white md:p-8">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm font-semibold text-[#7fc9ff] backdrop-blur-xl">
                    <Newspaper size={16} />
                    Current Priority
                  </div>
                  <h2 className="font-display mt-6 max-w-xl text-4xl font-semibold leading-tight md:text-5xl">
                    {content.pageSections.blogFeatureTitle}
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
                    {content.pageSections.blogFeatureDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-4 pb-10">
          <div className="section-shell">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {topPriorities.map((priority) => {
                const Icon = priority.icon;

                return (
                  <article
                    key={priority.title}
                    className="glass-panel rounded-[1.25rem] p-5"
                  >
                    <div className="grid size-11 place-items-center rounded-2xl border border-[#087ec3]/25 bg-[#087ec3]/10 text-[#087ec3]">
                      <Icon size={22} />
                    </div>
                    <h2 className="font-display mt-5 text-xl font-semibold leading-tight text-slate-950">
                      {priority.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {priority.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative px-4 pb-24">
          <div className="section-shell">
            {featuredPost ? (
              <article className="overflow-hidden rounded-[1.5rem] border border-slate-900/10 bg-slate-950 text-white shadow-[0_28px_90px_rgba(8,32,70,0.16)]">
                <div className="grid gap-0 lg:grid-cols-[1.06fr_0.94fr]">
                  <div className="p-6 md:p-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-sm font-semibold text-[#7fc9ff]">
                      <BookOpen size={16} />
                      Important Article
                    </div>
                    <h2 className="font-display mt-7 text-4xl font-semibold leading-tight md:text-5xl">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                      {featuredPost.excerpt}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                      <span className="rounded-full border border-white/14 bg-white/8 px-4 py-2">
                        {featuredPost.category}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2">
                        <Clock3 size={15} />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {[
                        "Best for students comparing major destinations.",
                        "Useful before booking counseling or building documents.",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex gap-3 rounded-2xl border border-white/12 bg-white/8 p-4 text-sm leading-6 text-slate-200"
                        >
                          <FileSearch className="mt-0.5 shrink-0 text-[#7fc9ff]" size={17} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative flex min-h-72 flex-col justify-between bg-white p-6 text-slate-950 md:p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#ed1c24]">
                      Start Here
                    </p>
                    <div>
                      <p className="font-display text-3xl font-semibold leading-tight">
                        Read the latest article, then compare your destination, budget, and timeline.
                      </p>
                      <p className="mt-4 leading-7 text-slate-600">
                        The strongest applications usually begin with a clear country reason, realistic finances, and documents that support the same story.
                      </p>
                      <Button asChild className="mt-7">
                        <Link href="/#book-appointment">
                          Book Counseling
                          <ArrowRight size={18} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ) : (
              <div className="glass-panel rounded-[1.5rem] p-8 text-center">
                <h2 className="font-display text-3xl font-semibold text-slate-950">
                  No published articles yet.
                </h2>
                <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
                  New articles are being prepared and will appear here soon.
                </p>
              </div>
            )}

            {remainingPosts.length > 0 ? (
              <div className="mt-12">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#087ec3]">
                      More Articles
                    </p>
                    <h2 className="font-display mt-3 text-3xl font-semibold text-slate-950 md:text-4xl">
                      Keep the important decisions visible.
                    </h2>
                  </div>
                  <p className="max-w-xl leading-7 text-slate-600">
                    Use these notes to compare countries, prepare documents, understand visa pressure points, and ask sharper questions during counseling.
                  </p>
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {remainingPosts.map((post) => (
                  <article
                    key={post.title}
                    className="glass-panel group flex min-h-72 flex-col justify-between rounded-[1.5rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#ed1c24]/36"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        <span className="rounded-full bg-[#087ec3]/10 px-3 py-1 text-[#087ec3]">
                          {post.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 size={13} />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-display mt-8 text-2xl font-semibold leading-tight text-slate-950">
                        {post.title}
                      </h3>
                      <p className="mt-5 leading-7 text-slate-600">
                        {post.excerpt}
                      </p>
                    </div>
                    <span className="mt-8 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-900/10 bg-white/70 text-slate-700 transition group-hover:border-[#f75b20]/60 group-hover:text-[#ed1c24]">
                      <ArrowRight size={18} />
                    </span>
                  </article>
                ))}
                </div>
              </div>
            ) : null}

            <div className="mt-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="glass-panel rounded-[1.5rem] p-6">
                <div className="grid size-12 place-items-center rounded-2xl border border-[#f75b20]/25 bg-[#f75b20]/10 text-[#f75b20]">
                  <BadgeCheck size={24} />
                </div>
                <h2 className="font-display mt-6 text-3xl font-semibold leading-tight text-slate-950">
                  What visitors should understand before applying
                </h2>
                <p className="mt-4 leading-7 text-slate-600">
                  A good study abroad plan is not only about choosing a country. It should match academic history, budget, document strength, visa expectations, and long-term career direction.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Choose a destination after comparing tuition, work options, location, and visa rules.",
                  "Prepare financial documents early so the source of funds is clear and consistent.",
                  "Build your SOP around real academic intent, not generic templates.",
                  "Ask for a timeline that shows tests, applications, offers, visa filing, and departure.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.25rem] border border-slate-900/10 bg-white/72 p-5 shadow-[0_16px_45px_rgba(8,32,70,0.08)] backdrop-blur-xl"
                  >
                    <BadgeCheck className="mt-0.5 shrink-0 text-[#087ec3]" size={18} />
                    <p className="text-sm leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={content.websiteSettings} content={content.pageSections} />
    </>
  );
}
