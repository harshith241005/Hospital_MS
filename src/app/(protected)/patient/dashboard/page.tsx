'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth/use-auth";
import { healthAdvisories, appointments, patients } from "@/lib/data";
import { CalendarPlus, FileText, HeartPulse, AlertCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useMemo } from "react";


const yearlyVisitsData = [
  { year: '2021', visits: 2 },
  { year: '2022', visits: 4 },
  { year: '2023', visits: 3 },
  { year: '2024', visits: 5 },
];


export default function PatientDashboardPage() {
    const { user } = useAuth();
    
    const patient = useMemo(() => patients.find(p => p.email === user?.email), [user?.email]);
    const upcomingAppointment = useMemo(() => appointments.find(a => a.patientId === patient?.id && a.status === 'confirmed'), [patient?.id]);
    
    const patientHero = PlaceHolderImages.find(p => p.id === 'patient-hero');

    return (
        <div className="space-y-6">
            <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                    {patientHero && (
                        <Image
                            src={patientHero.imageUrl}
                            alt={patientHero.description}
                            fill
                            className="object-cover"
                            data-ai-hint={patientHero.imageHint}
                        />
                    )}
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome, {user?.name}!</h1>
                        <p className="text-muted-foreground text-white/80">Manage your appointments, view reports, and stay on top of your health.</p>
                    </div>
                </div>
            </Card>

            {upcomingAppointment && (
                 <Card className="bg-primary text-primary-foreground">
                    <CardHeader>
                        <CardTitle>Upcoming Appointment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>You have an appointment with <strong>{upcomingAppointment.doctorName}</strong> on <strong>{upcomingAppointment.date}</strong> at <strong>{upcomingAppointment.time}</strong>.</p>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                 <Card>
                    <CardHeader>
                        <CardTitle>Book Appointment</CardTitle>
                        <CardDescription>Find a doctor and schedule your next visit.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/patient/dashboard/book-appointment">
                                <CalendarPlus className="mr-2 h-4 w-4" />
                                Book Now
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Medical Reports</CardTitle>
                        <CardDescription>Access your lab results and documents.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="outline">
                            <Link href="/patient/dashboard/medical-reports">
                                <FileText className="mr-2 h-4 w-4" />
                                View Reports
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Health Vitals</CardTitle>
                        <CardDescription>Track your health metrics over time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="outline">
                            <Link href="/patient/dashboard/vitals">
                                <HeartPulse className="mr-2 h-4 w-4" />
                                View Vitals
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Health Advisories</CardTitle>
                        <CardDescription>Personalized tips and reminders for you.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                        {healthAdvisories.map((advisory) => (
                            <li key={advisory.id} className="flex items-start gap-4">
                            <div className="flex-shrink-0 pt-1">
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
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Yearly Visits</CardTitle>
                        <CardDescription>Your appointment history over the years.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={yearlyVisitsData}>
                                <XAxis dataKey="year" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                <Bar dataKey="visits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

             {/* Support Widget Stub */}
            <div className="fixed bottom-6 right-6">
                <Button className="rounded-full w-14 h-14 shadow-lg">
                    <MessageSquare className="h-6 w-6" />
                    <span className="sr-only">Support Chat</span>
                </Button>
            </div>
        </div>
    )
}
