'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/auth/use-auth";
import { patients, prescriptions } from "@/lib/data";

export default function MyPrescriptionsPage() {
  const { user } = useAuth();
  
  const patient = patients.find(p => p.email === user?.email);
  const myPrescriptions = prescriptions.filter(p => p.patientId === patient?.id);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Prescriptions</h1>
        <p className="text-muted-foreground">
          View prescriptions from your doctors.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prescription List</CardTitle>
          <CardDescription>A list of all your prescriptions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prescribed to</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Medicines</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myPrescriptions.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.patientName}</TableCell>
                  <TableCell className="font-medium">{p.doctorName}</TableCell>
                  <TableCell>{p.date}</TableCell>
                  <TableCell>
                     {p.medicines.map(m => `${m.medicine} (${m.dosage})`).join(', ')}
                  </TableCell>
                  <TableCell>{p.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
