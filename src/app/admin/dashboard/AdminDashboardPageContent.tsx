import { redirect } from "next/navigation";
import { AdminDashboardClient, type AdminSectionKey } from "@/app/admin/dashboard/AdminDashboardClient";
import { getCurrentUser } from "@/lib/auth";
import { getSiteContent, listInquiries, listUsers } from "@/lib/database";

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

  const [users, inquiries, siteContent] = await Promise.all([
    listUsers(),
    listInquiries(),
    getSiteContent(),
  ]);

  return (
    <AdminDashboardClient
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
