import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  hashSessionToken,
  sessionCookieName,
  sessionCookieOptions,
} from "@/lib/auth";
import { deleteSession } from "@/lib/database";

export const runtime = "nodejs";

export async function POST() {
  const token = (await cookies()).get(sessionCookieName)?.value;

  if (token) {
    await deleteSession(hashSessionToken(token));
  }

  const response = NextResponse.json({ ok: true, redirectTo: "/login" });

  response.cookies.set(sessionCookieName, "", {
    ...sessionCookieOptions,
    maxAge: 0,
  });

  return response;
}
