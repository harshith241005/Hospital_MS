'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/auth/use-auth";
import { doctors, patients, medicalReports as initialReports } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import type { MedicalReport } from "@/lib/types";
import { Download, Upload } from "lucide-react";

export default function PatientReportsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const doctor = doctors.find(d => d.email === user?.email);
  const [reports, setReports] = useState<MedicalReport[]>(initialReports);
  const [newReport, setNewReport] = useState({
    patientId: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    file: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewReport(prev => ({ ...prev, [id]: value }));
  };

  const handlePatientSelect = (patientId: string) => {
    setNewReport(prev => ({ ...prev, patientId }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewReport(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleUploadReport = () => {
    if (!newReport.patientId || !newReport.title || !newReport.file || !doctor) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill out all fields and select a file.',
      });
      return;
    }

    const patient = patients.find(p => p.id === newReport.patientId);
    if (!patient) return;

    const newReportData: MedicalReport = {
        id: `MR${String(reports.length + 1).padStart(3, '0')}`,
        patientId: newReport.patientId,
        doctorId: doctor.id,
        title: newReport.title,
        date: newReport.date,
        fileUrl: `/reports/${newReport.file.name}`
    };

    setReports(prev => [newReportData, ...prev]);
    toast({
        title: 'Report Uploaded',
        description: `Report for ${patient.name} has been successfully uploaded.`
    });

    // Reset form
    setNewReport({
        patientId: '',
        title: '',
        date: new Date().toISOString().split('T')[0],
        file: null
    });
  };


  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Upload Patient Report</CardTitle>
          <CardDescription>
            Fill out the form to upload a new medical report for a patient.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
           <div className="grid gap-2">
            <Label htmlFor="doctor">Doctor</Label>
            <Input id="doctor" value={doctor?.name || ''} disabled />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="patient">Patient</Label>
            <Select onValueChange={handlePatientSelect} value={newReport.patientId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
           <div className="grid gap-2">
            <Label htmlFor="title">Report Title</Label>
            <Input id="title" placeholder="e.g., Blood Test Results" value={newReport.title} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={newReport.date} onChange={handleInputChange}/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="file">Report File</Label>
            <Input id="file" type="file" onChange={handleFileChange} />
          </div>
          <Button onClick={handleUploadReport}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Report
          </Button>
        </CardContent>
      </Card>
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>A list of recently uploaded reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{patients.find(p => p.id === r.patientId)?.name}</TableCell>
                  <TableCell>{r.title}</TableCell>
                   <TableCell>{r.date}</TableCell>
                   <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                        </Button>
                   </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
