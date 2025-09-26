'use client';

import type { ReactNode } from 'react';
import { createContext, useState, useEffect, useCallback } from 'react';
import type { User, UserRole } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: Record<string, { role: UserRole; name: string }> = {
  'admin@hms.com': { role: 'admin', name: 'Admin User' },
  'doctor@hms.com': { role: 'doctor', name: 'Dr. Ramesh Verma' },
  'patient@hms.com': { role: 'patient', name: 'Rahul Mehta' },
  'priya.reddy@example.com': { role: 'patient', name: 'Priya Reddy' },
  'ankit.gupta@example.com': { role: 'patient', name: 'Ankit Gupta' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('hms_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('hms_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    (email: string) => {
      const lowercasedEmail = email.toLowerCase();
      const userData = MOCK_USERS[lowercasedEmail];
      
      if (userData) {
        const newUser: User = {
          id: lowercasedEmail,
          email: lowercasedEmail,
          role: userData.role,
          name: userData.name,
        };
        localStorage.setItem('hms_user', JSON.stringify(newUser));
        setUser(newUser);
      } else {
        throw new Error('Invalid credentials');
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem('hms_user');
    setUser(null);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
