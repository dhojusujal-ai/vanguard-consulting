import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts as defaultBlogPosts, pageSections } from "@/data/site";
import type { BlogPost, PageSectionContent } from "@/types";

export function BlogPreview({
  posts = defaultBlogPosts,
  content = pageSections,
}: {
  posts?: BlogPost[];
  content?: PageSectionContent;
}) {
  return (
    <section className="relative py-24 md:py-32">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <SectionHeading
            eyebrow={content.blogEyebrow}
            title={content.blogTitle}
            description={content.blogDescription}
          />
          <Reveal>
            <div className="rounded-[1.75rem] border border-slate-900/10 bg-white/60 p-6 shadow-[0_18px_55px_rgba(8,32,70,0.08)] backdrop-blur-xl">
              <p className="font-display text-3xl font-semibold text-slate-950">
                {content.blogFeatureTitle}
              </p>
              <p className="mt-4 leading-7 text-slate-600">
                {content.blogFeatureDescription}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.title} delay={index * 0.07}>
              <article className="group flex min-h-80 flex-col justify-between rounded-[1.75rem] border border-slate-900/10 bg-white/68 p-6 shadow-[0_18px_55px_rgba(8,32,70,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-[#ed1c24]/36">
                <div>
                  <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.25em] text-slate-400">
                    <span>{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-display mt-10 text-2xl font-semibold leading-tight text-slate-950">
                    {post.title}
                  </h3>
                  <p className="mt-5 leading-7 text-slate-600">{post.excerpt}</p>
                </div>
                <span className="mt-8 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-900/10 bg-white/70 text-slate-700 transition group-hover:border-[#f75b20]/60 group-hover:text-[#ed1c24]">
                  <ArrowUpRight size={18} />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
