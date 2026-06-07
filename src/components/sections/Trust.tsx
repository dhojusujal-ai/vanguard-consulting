import { Counter } from "@/components/animations/Counter";
import { Reveal } from "@/components/animations/Reveal";
import { stats } from "@/data/site";

export function Trust() {
  return (
    <section className="relative py-20">
      <div className="section-shell grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.06}>
            <div className="glass-panel glow-border rounded-[1.5rem] p-6">
              <p className="font-display text-4xl font-semibold text-slate-950 md:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-600">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
