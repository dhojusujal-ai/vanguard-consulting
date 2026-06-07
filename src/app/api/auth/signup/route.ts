import { NextResponse } from "next/server";
import {
  getAdminSignupCode,
  getDashboardPath,
  hashPassword,
  sessionCookieName,
  sessionCookieOptions,
  startSession,
} from "@/lib/auth";
import { createUser } from "@/lib/database";
import type { UserRole } from "@/types";

export const runtime = "nodejs";

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const payload: unknown = await request.json();

    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ error: "Please complete the signup form." }, { status: 400 });
    }

    const fields = payload as Record<string, unknown>;
    const fullName = asString(fields.full_name);
    const email = asString(fields.email).toLowerCase();
    const password = asString(fields.password);
    const role = asString(fields.role) === "admin" ? "admin" : "user";
    const adminCode = asString(fields.admin_code);

    if (fullName.length < 2 || !email.includes("@") || password.length < 8) {
      return NextResponse.json(
        { error: "Use your name, a valid email, and an 8+ character password." },
        { status: 400 },
      );
    }

    if (role === "admin" && adminCode !== getAdminSignupCode()) {
      return NextResponse.json(
        { error: "Enter the correct admin signup code." },
        { status: 403 },
      );
    }

    const user = await createUser({
      full_name: fullName,
      email,
      password_hash: hashPassword(password),
      role: role as UserRole,
    });
    const token = await startSession(user.id);
    const response = NextResponse.json({
      ok: true,
      redirectTo: getDashboardPath(user.role),
    });

    response.cookies.set(sessionCookieName, token, sessionCookieOptions);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (message.includes("duplicate key")) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    console.error("Signup failed", error);

    return NextResponse.json({ error: "Unable to create account right now." }, { status: 500 });
  }
}
