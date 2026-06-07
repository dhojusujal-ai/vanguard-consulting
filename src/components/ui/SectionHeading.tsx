import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#ff8a3d]/85">
        {eyebrow}
      </p>
      <h2 className="font-display text-balance text-4xl font-semibold leading-[1.02] text-slate-950 md:text-6xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
        {description}
      </p>
    </div>
  );
}
