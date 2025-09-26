import type { ReactNode } from 'react';
import { UserNav } from './user-nav';
import { Logo } from './logo';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

interface DashboardLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function DashboardLayout({ sidebar, children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="icon">
        {sidebar}
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <div className="hidden md:block">
              <Logo/>
            </div>
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
