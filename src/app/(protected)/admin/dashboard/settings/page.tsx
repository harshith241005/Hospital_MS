'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Moon, Sun } from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <h3 className="font-medium">Theme</h3>
              <p className="text-sm text-muted-foreground">
                Select a theme for the dashboard.
              </p>
            </div>
            <div className="flex items-center gap-2">
                <Button 
                    variant={theme === 'light' ? 'default' : 'outline'} 
                    size="icon"
                    onClick={() => setTheme('light')}
                >
                    <Sun className="h-5 w-5" />
                </Button>
                 <Button 
                    variant={theme === 'dark' ? 'default' : 'outline'} 
                    size="icon"
                    onClick={() => setTheme('dark')}
                >
                    <Moon className="h-5 w-5" />
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
