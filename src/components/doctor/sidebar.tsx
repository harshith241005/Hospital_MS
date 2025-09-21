'use client';

import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  CalendarDays,
  Calendar,
  ClipboardPenLine,
  FileText,
  FlaskConical,
} from 'lucide-react';
import { Logo } from '../dashboard/logo';

const menuItems = [
  { href: '/doctor/dashboard', label: 'My Schedule', icon: CalendarDays },
  { href: '/doctor/dashboard/appointments', label: 'Manage Appointments', icon: Calendar },
  { href: '/doctor/dashboard/prescriptions', label: 'Prescriptions', icon: ClipboardPenLine },
  { href: '/doctor/dashboard/records', label: 'Patient Medical Records', icon: FileText },
  { href: '/doctor/dashboard/lab-requests', label: 'Lab Requests', icon: FlaskConical },
];

export function DoctorSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                href={item.href}
                isActive={pathname === item.href}
                asChild
              >
                <a href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
