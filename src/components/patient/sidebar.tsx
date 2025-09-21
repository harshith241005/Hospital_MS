'use client';

import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  CalendarPlus,
  Calendar,
  ClipboardPenLine,
  FileText,
  CreditCard,
  HeartPulse,
  LogOut,
  MessageSquare,
} from 'lucide-react';
import { Logo } from '../dashboard/logo';
import { useAuth } from '@/lib/auth/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const menuItems = [
  { href: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/patient/dashboard/book-appointment', label: 'Book Appointment', icon: CalendarPlus },
  { href: '/patient/dashboard/my-appointments', label: 'My Appointments', icon: Calendar },
  { href: '/patient/dashboard/prescriptions', label: 'Prescriptions', icon: ClipboardPenLine },
  { href: '/patient/dashboard/medical-reports', label: 'Medical Reports', icon: FileText },
  { href: '/patient/dashboard/billing', label: 'Billing & Payments', icon: CreditCard },
  { href: '/patient/dashboard/vitals', label: 'Health Vitals', icon: HeartPulse },
  { href: '/patient/dashboard/feedback', label: 'Feedback', icon: MessageSquare },
];

export function PatientSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name ? name[0] : '';
  };


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
       <SidebarFooter>
         {user && (
            <div className="flex items-center gap-3 p-2 rounded-md transition-colors">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt={`@${user.name}`} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</span>
                    <span className="text-xs text-sidebar-foreground/70 truncate">{user.role}</span>
                </div>
            </div>
         )}
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={logout}>
                <LogOut/>
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
