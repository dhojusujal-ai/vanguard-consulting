import { redirect } from "next/navigation";
import { AdminDashboardClient, type AdminSectionKey } from "@/app/admin/dashboard/AdminDashboardClient";
import { getCurrentUser } from "@/lib/auth";
import { getSiteContent, listInquiries, listUsers } from "@/lib/database";
import { defaultSiteContent } from "@/data/site";

export async function AdminDashboardPageContent({
  activeSection,
}: {
  activeSection: AdminSectionKey;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  const needsUsers = activeSection === "roles" || activeSection === "dashboard";
  const needsInquiries = activeSection === "inquiries" || activeSection === "dashboard";
  const needsSiteContent = !["roles", "database", "notifications", "analytics", "inquiries"].includes(activeSection);

  const [users, inquiries, siteContent] = await Promise.all([
    needsUsers ? listUsers({ limit: 50 }) : Promise.resolve([]),
    needsInquiries ? listInquiries({ limit: 50 }) : Promise.resolve([]),
    needsSiteContent ? getSiteContent() : Promise.resolve(defaultSiteContent),
  ]);

  return (
    <AdminDashboardClient
      key={activeSection}
      activeSection={activeSection}
      users={users}
      inquiries={inquiries}
      destinationDetails={siteContent.destinationDetails}
      services={siteContent.services}
      timeline={siteContent.timeline}
      testimonials={siteContent.testimonials}
      blogPosts={siteContent.blogPosts}
      universities={siteContent.universities}
      initialGalleryItems={siteContent.galleryItems}
      teamMembers={siteContent.teamMembers}
      websiteSettings={siteContent.websiteSettings}
      pageSections={siteContent.pageSections}
    />
  );
}
