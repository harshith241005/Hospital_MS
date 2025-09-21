'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const appointmentData = [
  { month: 'Jan', total: Math.floor(Math.random() * 50) + 10 },
  { month: 'Feb', total: Math.floor(Math.random() * 50) + 10 },
  { month: 'Mar', total: Math.floor(Math.random() * 50) + 10 },
  { month: 'Apr', total: Math.floor(Math.random() * 50) + 10 },
  { month: 'May', total: Math.floor(Math.random() * 50) + 10 },
  { month: 'Jun', total: Math.floor(Math.random() * 50) + 10 },
  { month: 'Jul', total: Math.floor(Math.random() * 50) + 10 },
  { month: 'Aug', total: Math.floor(Math.random() * 50) + 10 },
  { month: 'Sep', total: Math.floor(Math.random() * 50) + 10 },
  { month: 'Oct', total: Math.floor(Math.random() * 50) + 10 },
  { month: 'Nov', total: Math.floor(Math.random() * 50) + 10 },
  { month: 'Dec', total: Math.floor(Math.random() * 50) + 10 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Visualize hospital performance and patient data.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Appointments Overview</CardTitle>
          <CardDescription>
            A summary of appointments over the last year.
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={appointmentData}>
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar
                dataKey="total"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
