
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, PieChart, Pie, Cell, Legend } from 'recharts';
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

const departmentAppointmentData = [
    { name: 'Cardiology', value: 40 },
    { name: 'Neurology', value: 25 },
    { name: 'Pediatrics', value: 30 },
    { name: 'Orthopedics', value: 20 },
    { name: 'Gynecology', value: 35 },
    { name: 'Dermatology', value: 15 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))', 'hsl(var(--accent-foreground))'];


export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Visualize hospital performance and patient data.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
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
        <Card>
            <CardHeader>
                <CardTitle>Appointments by Department</CardTitle>
                <CardDescription>
                    Distribution of appointments across different departments.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                        <Pie
                        data={departmentAppointmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                        {departmentAppointmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
