"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-4 pt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Vanguard Consulting home"
        >
          <Image
            src="/logo.png"
            alt="Vanguard Consulting logo"
            width={124}
            height={72}
            priority
            className="h-16 w-24 object-contain drop-shadow-[0_12px_34px_rgba(8,32,70,0.18)] md:h-20 md:w-32"
          />
        </Link>

        <nav
          className={cn(
            "ml-auto hidden w-fit items-center gap-4 rounded-full border px-4 py-2 transition duration-300 md:flex md:px-5",
            scrolled
              ? "border-slate-900/10 bg-white/86 shadow-[0_14px_60px_rgba(8,32,70,0.12)] backdrop-blur-2xl"
              : "border-slate-900/8 bg-white/58 backdrop-blur-md",
          )}
        >
          <div className="flex min-w-0 items-center justify-end gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-2.5 py-2 text-sm text-slate-600 transition hover:bg-slate-950/5 hover:text-slate-950 lg:px-3"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-950/5 hover:text-slate-950"
            >
              Login
            </Link>
            <Button asChild size="default">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          className={cn(
            "grid size-11 place-items-center rounded-full border text-slate-950 transition md:hidden",
            scrolled
              ? "border-slate-900/10 bg-white/86 shadow-[0_14px_60px_rgba(8,32,70,0.12)] backdrop-blur-2xl"
              : "border-slate-900/8 bg-white/70 backdrop-blur-md",
          )}
          onClick={() => setOpen((value) => !value)}
        >
          <Menu size={20} />
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-3 max-w-7xl rounded-2xl border border-slate-900/10 bg-white/94 p-3 shadow-[0_18px_60px_rgba(8,32,70,0.12)] backdrop-blur-2xl md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-4 py-3 text-slate-700"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="block rounded-xl px-4 py-3 text-slate-700"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="block rounded-xl px-4 py-3 font-semibold text-[#f75b20]"
            onClick={() => setOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
