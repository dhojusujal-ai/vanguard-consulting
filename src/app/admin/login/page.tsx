import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { getCurrentUser, getDashboardPath } from "@/lib/auth";

export const metadata = {
  title: "Admin Login",
};

export default async function AdminLoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(getDashboardPath(user.role));
  }

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col items-center justify-center gap-8">
        <Link href="/" className="font-display text-2xl font-semibold text-slate-950">
          Vanguard Consulting Admin
        </Link>
        <AuthForm mode="login" intent="admin" />
      </div>
    </main>
  );
}
