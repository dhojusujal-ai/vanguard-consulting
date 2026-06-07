import { AdminDashboardPageContent } from "@/app/admin/dashboard/AdminDashboardPageContent";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboardPage() {
  return <AdminDashboardPageContent activeSection="dashboard" />;
}
