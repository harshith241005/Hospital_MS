'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { AuthProvider } from '@/lib/auth/auth-context';

function HomeComponent() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      // Wait until the auth state is fully loaded
      return;
    }

    if (!user) {
      router.push('/login');
    } else {
      switch (user.role) {
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'doctor':
          router.push('/doctor/dashboard');
          break;
        case 'patient':
          router.push('/patient/dashboard');
          break;
        default:
          router.push('/login');
      }
    }
  }, [user, loading, router]);

  // Show a loading skeleton while the auth state is being determined
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
    return (
        <AuthProvider>
            <HomeComponent />
        </AuthProvider>
    )
}
