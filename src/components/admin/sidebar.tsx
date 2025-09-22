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
  Stethoscope,
  Users,
  Calendar,
  ClipboardList,
  BarChart,
  LogOut,
  Settings,
  Building,
  BedDouble,
  MessageSquare,
  Info
} from 'lucide-react';
import { Logo } from '../dashboard/logo';
import { useAuth } from '@/lib/auth/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/dashboard/doctors', label: 'Manage Doctors', icon: Stethoscope },
  { href: '/admin/dashboard/patients', label: 'Manage Patients', icon: Users },
  { href: '/admin/dashboard/appointments', label: 'All Appointments', icon: Calendar },
  { href: '/admin/dashboard/rooms', label: 'Room Management', icon: BedDouble },
  { href: '/admin/dashboard/staff', label: 'Manage Staff', icon: ClipboardList },
  { href: '/admin/dashboard/reports', label: 'Reports & Analytics', icon: BarChart },
  { href: '/admin/dashboard/feedback', label: 'Feedback', icon: MessageSquare },
  { href: '/admin/dashboard/about', label: 'About Hospital', icon: Info },
];

export function AdminSidebar() {
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
                    <span className="text-xs text-sidebar-foreground/70 truncate capitalize">{user.role === 'admin' ? 'Admin' : user.role}</span>
                </div>
            </div>
         )}
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/dashboard/settings"
                isActive={pathname === '/admin/dashboard/settings'}
                asChild
              >
                <a href="/admin/dashboard/settings">
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
