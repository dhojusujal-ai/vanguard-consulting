import { NextResponse } from "next/server";
import {
  getDashboardPath,
  sessionCookieName,
  sessionCookieOptions,
  startSession,
  verifyPassword,
} from "@/lib/auth";
import { findUserByEmail } from "@/lib/database";

export const runtime = "nodejs";

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const payload: unknown = await request.json();

    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ error: "Please enter your login details." }, { status: 400 });
    }

    const fields = payload as Record<string, unknown>;
    const email = asString(fields.email).toLowerCase();
    const password = asString(fields.password);
    const requestedRole = asString(fields.role);
    const user = await findUserByEmail(email);

    if (!user || !verifyPassword(password, user.password_hash)) {
      return NextResponse.json(
        { error: "Email or password is incorrect." },
        { status: 401 },
      );
    }

    if (requestedRole === "admin" && user.role !== "admin") {
      return NextResponse.json(
        { error: "This account does not have admin access." },
        { status: 403 },
      );
    }

    const token = await startSession(user.id);
    const response = NextResponse.json({
      ok: true,
      redirectTo: getDashboardPath(user.role),
    });

    response.cookies.set(sessionCookieName, token, sessionCookieOptions);

    return response;
  } catch (error) {
    console.error("Login failed", error);

    return NextResponse.json({ error: "Unable to log in right now." }, { status: 500 });
  }
}
