'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/lib/auth/use-auth";
import { medicalReports, patients, doctors } from "@/lib/data";
import { Download } from "lucide-react";


export default function MedicalReportsPage() {
    const { user } = useAuth();
  
    const patient = patients.find(p => p.email === user?.email);
    const myReports = medicalReports.filter(r => r.patientId === patient?.id);


    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Medical Reports</h1>
                    <p className="text-muted-foreground">View and download your medical reports uploaded by your doctor.</p>
                </div>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>My Reports</CardTitle>
                    <CardDescription>A list of all your uploaded medical reports.</CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Report Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Uploaded by</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {myReports.map((report) => {
                        const doctor = doctors.find(d => d.id === report.doctorId);
                        return (
                            <TableRow key={report.id}>
                            <TableCell className="font-medium">{patient?.name}</TableCell>
                            <TableCell>{report.title}</TableCell>
                            <TableCell>{report.date}</TableCell>
                            <TableCell>{doctor?.name || 'N/A'}</TableCell>
                            <TableCell className="text-right">
                               <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                               </Button>
                            </TableCell>
                            </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>
    )
}
