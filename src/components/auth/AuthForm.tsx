"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

type AuthFormProps = {
  mode: "login" | "signup";
  intent?: "user" | "admin";
};

type AuthResponse = {
  error?: string;
  redirectTo?: string;
};

const initialSignupForm = {
  full_name: "",
  email: "",
  password: "",
  role: "user",
  admin_code: "",
};

const initialLoginForm = {
  email: "",
  password: "",
};

export function AuthForm({ mode, intent = "user" }: AuthFormProps) {
  const router = useRouter();
  const [signupForm, setSignupForm] = useState({
    ...initialSignupForm,
    role: intent === "admin" ? "admin" : "user",
  });
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminCode, setShowAdminCode] = useState(false);
  const isSignup = mode === "signup";

  const updateSignup = (field: keyof typeof initialSignupForm, value: string) => {
    setSignupForm((current) => ({ ...current, [field]: value }));
  };

  const updateLogin = (field: keyof typeof initialLoginForm, value: string) => {
    setLoginForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        isSignup
          ? signupForm
          : {
              ...loginForm,
              role: intent,
            },
      ),
    });
    const result: AuthResponse = await response.json();

    if (!response.ok || !result.redirectTo) {
      setStatus("error");
      setFeedback(result.error ?? "Something went wrong. Please try again.");
      return;
    }

    router.push(result.redirectTo);
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel glow-border w-full max-w-xl rounded-[2rem] p-5 md:p-8"
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-2xl bg-[#087ec3]/10 text-[#087ec3]">
          {isSignup ? <UserPlus size={22} /> : <LockKeyhole size={22} />}
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f75b20]">
            {isSignup ? "Create account" : intent === "admin" ? "Admin access" : "Welcome back"}
          </p>
          <h1 className="font-display text-3xl font-semibold text-slate-950">
            {isSignup
              ? intent === "admin"
                ? "Create admin account"
                : "Sign up for Vanguard"
              : intent === "admin"
                ? "Log in to admin dashboard"
                : "Log in to your dashboard"}
          </h1>
        </div>
      </div>

      <div className="grid gap-5">
        {isSignup && (
          <label className="space-y-2">
            <span className="text-sm text-slate-600">Full name</span>
            <input
              required
              name="full_name"
              autoComplete="name"
              value={signupForm.full_name}
              onChange={(event) => updateSignup("full_name", event.target.value)}
              className="h-14 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#f75b20]/70"
              placeholder="Your name"
            />
          </label>
        )}

        <label className="space-y-2">
          <span className="text-sm text-slate-600">Email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={isSignup ? signupForm.email : loginForm.email}
            onChange={(event) =>
              isSignup
                ? updateSignup("email", event.target.value)
                : updateLogin("email", event.target.value)
            }
            className="h-14 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#f75b20]/70"
            placeholder="you@email.com"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm text-slate-600">Password</span>
          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              minLength={8}
              value={isSignup ? signupForm.password : loginForm.password}
              onChange={(event) =>
                isSignup
                  ? updateSignup("password", event.target.value)
                  : updateLogin("password", event.target.value)
              }
              className="h-14 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 pr-14 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#f75b20]/70"
              placeholder="At least 8 characters"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-slate-500 transition hover:bg-slate-950/5 hover:text-slate-950"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>

        {isSignup && (
          <>
            <label className="space-y-2">
              <span className="text-sm text-slate-600">Account type</span>
              <select
                name="role"
                value={signupForm.role}
                onChange={(event) => updateSignup("role", event.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 text-slate-950 outline-none transition focus:border-[#f75b20]/70"
              >
                <option value="user">Student user</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            {signupForm.role === "admin" && (
              <label className="space-y-2">
                <span className="text-sm text-slate-600">Admin signup code</span>
                <div className="relative">
                  <input
                    required
                    type={showAdminCode ? "text" : "password"}
                    name="admin_code"
                    value={signupForm.admin_code}
                    onChange={(event) => updateSignup("admin_code", event.target.value)}
                    className="h-14 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 pr-14 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#f75b20]/70"
                    placeholder="Admin code"
                  />
                  <button
                    type="button"
                    aria-label={showAdminCode ? "Hide admin code" : "Show admin code"}
                    onClick={() => setShowAdminCode((value) => !value)}
                    className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-slate-500 transition hover:bg-slate-950/5 hover:text-slate-950"
                  >
                    {showAdminCode ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>
            )}
          </>
        )}
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === "loading"}>
          {status === "loading" ? "Please wait..." : isSignup ? "Create Account" : "Log In"}
          {isSignup ? <UserPlus size={17} /> : <LogIn size={17} />}
        </Button>
        <Link
          href={isSignup ? (intent === "admin" ? "/admin/login" : "/login") : intent === "admin" ? "/admin/signup" : "/signup"}
          className="text-sm font-medium text-[#087ec3] hover:text-[#f75b20]"
        >
          {isSignup ? "Already have an account?" : "Need an account?"}
        </Link>
      </div>

      {!isSignup ? (
        <div className="mt-5 rounded-2xl border border-slate-900/10 bg-white/62 p-4 text-sm text-slate-600">
          {intent === "admin" ? (
            <>
              Need to create an admin account first?{" "}
              <Link href="/admin/signup" className="font-semibold text-[#087ec3] hover:text-[#f75b20]">
                Create admin account.
              </Link>
            </>
          ) : (
            <>
              Are you an admin?{" "}
              <Link href="/admin/login" className="font-semibold text-[#087ec3] hover:text-[#f75b20]">
                Use admin login.
              </Link>
            </>
          )}
        </div>
      ) : null}

      {feedback && <p className="mt-5 text-sm text-[#ed1c24]">{feedback}</p>}
    </form>
  );
}
