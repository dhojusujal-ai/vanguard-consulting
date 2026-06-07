"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/types";

type DestinationCardProps = {
  destination: Destination;
  index: number;
};

const flagBackgrounds: Record<string, { src: string; background: string }> = {
  australia: {
    src: "/flags/australia.svg",
    background:
      "linear-gradient(135deg, rgba(1, 33, 105, 0.18), rgba(255, 255, 255, 0.78) 44%, rgba(200, 16, 46, 0.16))",
  },
  canada: {
    src: "/flags/canada.svg",
    background:
      "linear-gradient(90deg, rgba(237, 28, 36, 0.18), rgba(255, 255, 255, 0.8) 35%, rgba(255, 255, 255, 0.8) 65%, rgba(237, 28, 36, 0.18))",
  },
  "united-kingdom": {
    src: "/flags/united-kingdom.svg",
    background:
      "linear-gradient(135deg, rgba(1, 33, 105, 0.18), rgba(255, 255, 255, 0.78) 46%, rgba(200, 16, 46, 0.16))",
  },
  "united-states": {
    src: "/flags/united-states.svg",
    background:
      "repeating-linear-gradient(180deg, rgba(191, 10, 48, 0.14) 0 14px, rgba(255, 255, 255, 0.76) 14px 28px)",
  },
  india: {
    src: "/flags/india.svg",
    background:
      "linear-gradient(180deg, rgba(255, 153, 51, 0.18), rgba(255, 255, 255, 0.82) 48%, rgba(19, 136, 8, 0.16))",
  },
  bangladesh: {
    src: "/flags/bangladesh.svg",
    background:
      "radial-gradient(circle at 68% 38%, rgba(244, 42, 65, 0.2) 0 22%, transparent 23%), linear-gradient(135deg, rgba(0, 106, 78, 0.18), rgba(255, 255, 255, 0.78))",
  },
};

export function DestinationCard({ destination, index }: DestinationCardProps) {
  const flag = flagBackgrounds[destination.slug];

  return (
    <Link href={`/destinations/${destination.slug}`} className="block">
      <motion.article
        className="group relative min-h-72 overflow-hidden rounded-[1.75rem] border border-slate-900/10 bg-white/68 p-6 shadow-[0_18px_55px_rgba(8,32,70,0.08)] backdrop-blur-2xl focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-[#f75b20]"
        initial={{ y: 44, opacity: 0, rotateX: 10 }}
        whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
        whileHover={{ y: -12, rotateX: 4, rotateY: index % 2 === 0 ? -4 : 4 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.72, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: flag?.background,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 bg-white/48" />
        {flag && (
          <div
            aria-hidden="true"
            className="absolute -right-7 top-6 h-24 w-40 overflow-hidden rounded-2xl border border-white/60 opacity-25 shadow-[0_18px_40px_rgba(15,23,42,0.16)] transition duration-500 group-hover:scale-110 md:h-28 md:w-48"
          >
            <Image
              src={flag.src}
              alt=""
              fill
              sizes="192px"
              priority={index < 4}
              className="object-cover"
            />
          </div>
        )}
        <div
          className="absolute right-[-20%] top-[-18%] h-44 w-44 rounded-[42%] blur-3xl transition duration-500 group-hover:scale-125"
          style={{ backgroundColor: `${destination.accent}33` }}
        />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-slate-400">
              {destination.code}
            </p>
            <h3 className="font-display mt-4 text-3xl font-semibold text-slate-950">
              {destination.country}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{destination.city} pathway</p>
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-full border border-slate-900/10 bg-white/70 text-slate-700 transition group-hover:border-[#f75b20]/60 group-hover:text-[#ed1c24]">
            <ArrowUpRight size={18} />
          </span>
        </div>

        <div className="relative mt-10 space-y-4 text-sm">
          <div>
            <p className="text-slate-400">Programs</p>
            <p className="mt-1 text-slate-800">{destination.programs}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-900/10 bg-white/60 p-3">
              <p className="text-slate-400">Visa</p>
              <p className="mt-1 text-slate-700">{destination.visa}</p>
            </div>
            <div className="rounded-2xl border border-slate-900/10 bg-white/60 p-3">
              <p className="text-slate-400">Intake</p>
              <p className="mt-1 text-slate-700">{destination.intake}</p>
            </div>
          </div>
        </div>
        <p className="relative mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#087ec3]">
          View country details
          <ArrowUpRight size={15} />
        </p>
      </motion.article>
    </Link>
  );
}
