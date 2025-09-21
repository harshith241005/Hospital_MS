'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { doctorAdvisories, appointments } from "@/lib/data";
import { AlertCircle, Clock, Users, Video } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

const diagnosesData = [
    { name: 'Hypertension', value: 4 },
    { name: 'Migraine', value: 3 },
    { name: 'Diabetes', value: 2 },
    { name: 'Fever', value: 5 },
    { name: 'Fracture', value: 1 },
    { name: 'Allergy', value: 2 },
];
const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export default function DoctorDashboardPage() {
  const todayAppointments = appointments.filter(a => a.date === '2024-08-15').length; // Assuming today is Aug 15 for demo
  const doctorHero = PlaceHolderImages.find(p => p.id === 'doctor-hero');

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full">
            {doctorHero && (
                <Image
                    src={doctorHero.imageUrl}
                    alt={doctorHero.description}
                    fill
                    className="object-cover"
                    data-ai-hint={doctorHero.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
                <h1 className="text-3xl font-bold tracking-tight text-white">Doctor's Dashboard</h1>
                <p className="text-muted-foreground text-white/80">Your daily schedule, patient insights, and key advisories.</p>
            </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled for today.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Under your care.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tele-Consult</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button>Start Call</Button>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
         <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>My Schedule</CardTitle>
                <CardDescription>Your availability for the week.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <Calendar
                    mode="single"
                    selected={new Date('2024-08-15')}
                    className="rounded-md border"
                />
            </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Common Diagnoses</CardTitle>
            <CardDescription>Distribution of diagnoses among your patients.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={diagnosesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {diagnosesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
       <Card>
          <CardHeader>
            <CardTitle>Doctor Advisories</CardTitle>
            <CardDescription>Important updates, guidelines, and reminders.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {doctorAdvisories.map((advisory) => (
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
