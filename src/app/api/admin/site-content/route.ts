import { getCurrentUser } from "@/lib/auth";
import { saveSiteContent } from "@/lib/database";
import type { SiteContent } from "@/types";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return Response.json({ error: "Admin access required." }, { status: 403 });
  }

  try {
    const content = (await request.json()) as SiteContent;

    await saveSiteContent(content);

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Unable to save website content." },
      { status: 500 },
    );
  }
}
