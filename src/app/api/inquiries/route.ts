import { NextResponse } from "next/server";
import { insertInquiry } from "@/lib/database";
import type { InquiryPayload } from "@/types";

export const runtime = "nodejs";

function isInquiryPayload(value: unknown): value is InquiryPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Record<string, unknown>;

  return (
    typeof payload.full_name === "string" &&
    typeof payload.email === "string" &&
    typeof payload.phone === "string" &&
    typeof payload.destination === "string" &&
    typeof payload.preferred_date === "string" &&
    typeof payload.preferred_time === "string" &&
    typeof payload.counseling_mode === "string" &&
    typeof payload.message === "string" &&
    payload.full_name.trim().length > 1 &&
    payload.email.includes("@") &&
    payload.phone.trim().length > 4 &&
    payload.destination.trim().length > 1 &&
    payload.preferred_date.trim().length > 1 &&
    payload.preferred_time.trim().length > 1 &&
    payload.counseling_mode.trim().length > 1 &&
    payload.message.trim().length > 4
  );
}

export async function POST(request: Request) {
  try {
    const payload: unknown = await request.json();

    if (!isInquiryPayload(payload)) {
      return NextResponse.json(
        { error: "Please complete every field with valid details." },
        { status: 400 },
      );
    }

    await insertInquiry({
      full_name: payload.full_name.trim(),
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone.trim(),
      destination: payload.destination.trim(),
      preferred_date: payload.preferred_date.trim(),
      preferred_time: payload.preferred_time.trim(),
      counseling_mode: payload.counseling_mode.trim(),
      message: payload.message.trim(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inquiry insert failed", error);

    return NextResponse.json(
      { error: "Unable to submit inquiry right now." },
      { status: 500 },
    );
  }
}
