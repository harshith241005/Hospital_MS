'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/use-auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Hospital } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AuthProvider } from '@/lib/auth/auth-context';

function LoginPageContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      login(email);
      let path = '/';
      const lowercasedEmail = email.toLowerCase();
      if (lowercasedEmail === 'admin@hms.com') {
        path = '/admin/dashboard';
      } else if (lowercasedEmail === 'doctor@hms.com') {
        path = '/doctor/dashboard';
      } else if (
        lowercasedEmail === 'patient@hms.com' || 
        lowercasedEmail === 'priya.reddy@example.com' ||
        lowercasedEmail === 'ankit.gupta@example.com'
        ) {
        path = '/patient/dashboard';
      }
      router.push(path);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid email or password. Please try again.',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-12">
       <div className="flex items-center justify-center py-12 w-full">
            <Card className="mx-auto max-w-sm w-full shadow-lg">
                <CardHeader className="text-center">
                    <div className="flex justify-center items-center mb-4">
                        <Hospital className="h-10 w-10 text-primary"/>
                    </div>
                <CardTitle className="text-2xl font-bold">MediTrack Pro</CardTitle>
                <CardDescription>
                    Enter your credentials to access your dashboard
                </CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleLogin} className="grid gap-4">
                    <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        id="password" 
                        type="password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground mt-4">
                        <p>Use one of the following to login:</p>
                        <ul className="list-disc list-inside">
                            <li>admin@hms.com</li>
                            <li>doctor@hms.com</li>
                            <li>patient@hms.com</li>
                        </ul>
                        <p className="mt-2">(Any password will work)</p>
                    </div>
                </form>
                </CardContent>
            </Card>
      </div>
    </div>
  );
}


export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginPageContent />
    </AuthProvider>
  );
}
