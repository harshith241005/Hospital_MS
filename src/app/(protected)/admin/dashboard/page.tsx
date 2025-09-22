'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { appointments, doctors, patients, adminAdvisories } from "@/lib/data";
import { Activity, Users, Stethoscope, AlertCircle } from "lucide-react";
import { ResponsiveContainer, BarChart as RechartsBarChart, XAxis, YAxis, Bar, PieChart as RechartsPieChart, Pie, Cell } from "recharts";


const departmentData = [
  { name: 'Cardiology', value: 4 },
  { name: 'Neurology', value: 3 },
  { name: 'Pediatrics', value: 5 },
  { name: 'Orthopedics', value: 2 },
  { name: 'Gynecology', value: 3 },
  { name: 'Dermatology', value: 1 },
];

const roomData = [
    { name: 'Occupied', value: 18 },
    { name: 'Available', value: 12 },
];
const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))'];


export default function AdminDashboardPage() {
  const totalPatients = patients.length;
  const totalDoctors = doctors.length;
  const totalAppointments = appointments.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Hospital-wide overview and analytics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPatients}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDoctors}</div>
            <p className="text-xs text-muted-foreground">
              All active doctors
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalAppointments}</div>
            <p className="text-xs text-muted-foreground">
              Total appointments scheduled
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Patients per Department</CardTitle>
             <CardDescription>Current patient distribution across departments.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={departmentData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
         <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Room Occupancy</CardTitle>
             <CardDescription>Current availability of hospital rooms.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie data={roomData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {roomData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
       <Card>
          <CardHeader>
            <CardTitle>Announcements & Advisories</CardTitle>
            <CardDescription>Important updates and alerts for hospital staff.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {adminAdvisories.map((advisory) => (
                <li key={advisory.id} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                     <AlertCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{advisory.title}</p>
                    <p className="text-sm text-muted-foreground">{advisory.details}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
    </div>
  );
}
