import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DoctorSidebar } from '@/components/doctor/sidebar';

export default function DoctorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout sidebar={<DoctorSidebar />}>
      {children}
    </DashboardLayout>
  );
}
