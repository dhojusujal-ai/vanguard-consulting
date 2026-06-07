import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarCheck, Compass, FileText, Sparkles } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "User Dashboard",
};

const nextSteps = [
  {
    title: "Book counseling",
    description: "Choose a preferred date and time for your study-abroad counseling session.",
    icon: CalendarCheck,
    href: "/#book-appointment",
  },
  {
    title: "Explore destinations",
    description: "Compare Australia, Canada, UK, USA, India, Bangladesh, and Europe routes.",
    icon: Compass,
    href: "/#destinations",
  },
  {
    title: "Prepare documents",
    description: "Bring academic records, finance details, passport information, and intake goals.",
    icon: FileText,
    href: "/#process",
  },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 border-b border-slate-900/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="text-sm font-semibold text-[#087ec3]">
              Vanguard Consulting
            </Link>
            <h1 className="mt-3 font-display text-4xl font-semibold text-slate-950">
              Welcome, {user.full_name}
            </h1>
            <p className="mt-2 text-slate-600">
              Your student dashboard is ready for counseling, destination planning, and document preparation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {user.role === "admin" && (
              <Link
                href="/admin/dashboard"
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-900/10 bg-white/70 px-6 text-sm font-semibold text-slate-900 shadow-[0_12px_36px_rgba(8,32,70,0.08)] backdrop-blur-xl transition hover:border-[#f75b20]/60 hover:bg-white"
              >
                Admin Dashboard
              </Link>
            )}
            <LogoutButton />
          </div>
        </header>

        <section className="glass-panel mt-8 rounded-[1.5rem] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#f75b20]/10 text-[#f75b20]">
              <Sparkles size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f75b20]">
                Login successful
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-slate-950">
                Welcome {user.full_name}
              </h2>
              <p className="mt-2 text-slate-600">
                You are signed in to your student account. Start with a booking or continue exploring your study pathway.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {nextSteps.map((step) => {
            const Icon = step.icon;

            return (
              <Link
                key={step.title}
                href={step.href}
                className="glass-panel rounded-[1.5rem] p-6 transition hover:-translate-y-1 hover:border-[#f75b20]/40"
              >
                <Icon className="text-[#f75b20]" size={28} />
                <h2 className="mt-5 font-display text-xl font-semibold text-slate-950">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
              </Link>
            );
          })}
        </section>

        <section className="mt-8 rounded-[1.5rem] border border-slate-900/10 bg-white/64 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f75b20]">
            Account
          </p>
          <div className="mt-5 grid gap-4 text-sm text-slate-600 md:grid-cols-3">
            <p>
              <span className="block font-semibold text-slate-950">Name</span>
              {user.full_name}
            </p>
            <p>
              <span className="block font-semibold text-slate-950">Email</span>
              {user.email}
            </p>
            <p>
              <span className="block font-semibold text-slate-950">Role</span>
              {user.role === "admin" ? "Admin" : "Student user"}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
