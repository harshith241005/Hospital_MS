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
  Calendar,
  ClipboardPenLine,
  FileText,
  FlaskConical,
  LogOut,
  Settings,
} from 'lucide-react';
import { Logo } from '../dashboard/logo';
import { useAuth } from '@/lib/auth/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


const menuItems = [
  { href: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/doctor/dashboard/appointments', label: 'Manage Appointments', icon: Calendar },
  { href: '/doctor/dashboard/prescriptions', label: 'Prescriptions', icon: ClipboardPenLine },
  { href: '/doctor/dashboard/records', label: 'Patient Medical Records', icon: FileText },
  { href: '/doctor/dashboard/lab-requests', label: 'Lab Requests', icon: FlaskConical },
];

export function DoctorSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const getInitials = (name: string) => {
    if (user?.role === 'doctor') return 'D';
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
                    <span className="text-sm font-medium text-sidebar-foreground truncate">Doctor</span>
                </div>
            </div>
         )}
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/doctor/dashboard/settings"
                isActive={pathname === '/doctor/dashboard/settings'}
                asChild
              >
                <a href="/doctor/dashboard/settings">
                  <Settings/>
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
