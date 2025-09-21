'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth/use-auth";
import { CalendarPlus, FileText } from "lucide-react";
import Link from "next/link";

export default function PatientDashboardPage() {
    const { user } = useAuth();

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}!</h1>
                <p className="text-muted-foreground">
                Manage your appointments, view reports, and more.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Book a New Appointment</CardTitle>
                        <CardDescription>Find a doctor and schedule your next visit.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/patient/dashboard/book-appointment">
                                <CalendarPlus className="mr-2 h-4 w-4" />
                                Book Appointment
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>View Medical Reports</CardTitle>
                        <CardDescription>Access your lab results and other medical documents.</CardDescription>
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
            </div>
        </div>
    )
}