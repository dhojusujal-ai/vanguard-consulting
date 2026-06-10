import { NextResponse } from "next/server";
import { getCurrentUser, getAdminSignupCode } from "@/lib/auth";
import { saveAdminSignupCode } from "@/lib/database";

export const runtime = "nodejs";

function maskCode(code: string) {
  if (code.length <= 4) return "*".repeat(code.length);
  return code.slice(0, 2) + "*".repeat(Math.max(0, code.length - 4)) + code.slice(-2);
}

export async function GET() {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const code = await getAdminSignupCode();

  return NextResponse.json({ maskedCode: maskCode(code), length: code.length });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const fields = body as Record<string, unknown>;
  const newCode = typeof fields.newCode === "string" ? fields.newCode.trim() : "";
  const confirmCode = typeof fields.confirmCode === "string" ? fields.confirmCode.trim() : "";

  if (newCode.length < 6) {
    return NextResponse.json(
      { error: "Admin code must be at least 6 characters." },
      { status: 400 },
    );
  }

  if (newCode !== confirmCode) {
    return NextResponse.json(
      { error: "Codes do not match. Please re-enter." },
      { status: 400 },
    );
  }

  await saveAdminSignupCode(newCode);

  return NextResponse.json({ ok: true, maskedCode: maskCode(newCode) });
}
