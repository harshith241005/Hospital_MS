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
  LayoutDashboard,
  Stethoscope,
  Users,
  Calendar,
  ClipboardList,
  BarChart,
} from 'lucide-react';
import { Logo } from '../dashboard/logo';

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/dashboard/doctors', label: 'Manage Doctors', icon: Stethoscope },
  { href: '/admin/dashboard/patients', label: 'Manage Patients', icon: Users },
  { href: '/admin/dashboard/appointments', label: 'All Appointments', icon: Calendar },
  { href: '/admin/dashboard/staff', label: 'Manage Staff', icon: ClipboardList },
  { href: '/admin/dashboard/reports', label: 'Reports & Analytics', icon: BarChart },
];

export function AdminSidebar() {
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
