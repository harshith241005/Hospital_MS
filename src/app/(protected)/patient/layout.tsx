import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { PatientSidebar } from '@/components/patient/sidebar';

export default function PatientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout sidebar={<PatientSidebar />}>
      {children}
    </DashboardLayout>
  );
}
