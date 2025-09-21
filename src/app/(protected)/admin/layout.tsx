import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { AdminSidebar } from '@/components/admin/sidebar';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout sidebar={<AdminSidebar />}>
      {children}
    </DashboardLayout>
  );
}
