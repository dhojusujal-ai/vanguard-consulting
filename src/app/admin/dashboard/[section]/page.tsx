import { notFound } from "next/navigation";
import { AdminDashboardPageContent } from "@/app/admin/dashboard/AdminDashboardPageContent";
import type { AdminSectionKey } from "@/app/admin/dashboard/AdminDashboardClient";

type AdminRouteSection = Exclude<AdminSectionKey, "dashboard">;

const adminSections = [
  "inquiries",
  "counseling",
  "countries",
  "testimonials",
  "why-choose-us",
  "page-sections",
  "services",
  "test-prep",
  "applications",
  "contact-forms",
  "blog",
  "universities",
  "gallery",
  "team",
  "settings",
  "seo",
  "roles",
  "analytics",
  "notifications",
  "database",
] satisfies AdminRouteSection[];

export const metadata = {
  title: "Admin Section",
};

export function generateStaticParams() {
  return adminSections.map((section) => ({ section }));
}

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!adminSections.includes(section as AdminRouteSection)) {
    notFound();
  }

  return <AdminDashboardPageContent activeSection={section as AdminSectionKey} />;
}
