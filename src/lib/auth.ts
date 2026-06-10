import { randomBytes, scryptSync, timingSafeEqual, createHash } from "crypto";
import { cookies } from "next/headers";
import {
  createSession,
  findUserBySessionToken,
} from "@/lib/database";
import type { AppUser, UserRole } from "@/types";

export const sessionCookieName = "vanguard_session";
export const sessionMaxAgeSeconds = 60 * 60 * 24 * 7;

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: sessionMaxAgeSeconds,
};

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");

  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");

  if (!salt || !hash) {
    return false;
  }

  const hashBuffer = Buffer.from(hash, "hex");
  const candidateBuffer = scryptSync(password, salt, 64);

  return (
    hashBuffer.length === candidateBuffer.length &&
    timingSafeEqual(hashBuffer, candidateBuffer)
  );
}

export function createSessionToken() {
  return randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function startSession(userId: string) {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + sessionMaxAgeSeconds * 1000);

  await createSession({
    user_id: userId,
    token_hash: hashSessionToken(token),
    expires_at: expiresAt,
  });

  return token;
}

export async function getCurrentUser(): Promise<AppUser | null> {
  const token = (await cookies()).get(sessionCookieName)?.value;

  if (!token) {
    return null;
  }

  return findUserBySessionToken(hashSessionToken(token));
}

export function getDashboardPath(role: UserRole) {
  return role === "admin" ? "/admin/dashboard" : "/dashboard";
}

export async function getAdminSignupCode(): Promise<string> {
  const { getStoredAdminSignupCode } = await import("@/lib/database");
  const stored = await getStoredAdminSignupCode();
  return stored ?? process.env.ADMIN_SIGNUP_CODE ?? "vanguard-admin";
}
