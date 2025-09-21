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
  CalendarPlus,
  Calendar,
  ClipboardPenLine,
  FileText,
  CreditCard,
} from 'lucide-react';
import { Logo } from '../dashboard/logo';

const menuItems = [
  { href: '/patient/dashboard', label: 'Dashboard', icon: Calendar },
  { href: '/patient/dashboard/book-appointment', label: 'Book Appointment', icon: CalendarPlus },
  { href: '/patient/dashboard/my-appointments', label: 'My Appointments', icon: Calendar },
  { href: '/patient/dashboard/prescriptions', label: 'Prescriptions', icon: ClipboardPenLine },
  { href: '/patient/dashboard/medical-reports', label: 'Medical Reports', icon: FileText },
  { href: '/patient/dashboard/billing', label: 'Billing & Payments', icon: CreditCard },
];

export function PatientSidebar() {
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
