import { Badge } from "@/components/ui/badge";
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
import { appointments } from "@/lib/data";

const statusVariant = {
    pending: 'secondary',
    confirmed: 'default',
    completed: 'outline',
    cancelled: 'destructive'
} as const;

export default function ViewAllAppointmentsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">All Appointments</h1>
        <p className="text-muted-foreground">View all appointments across the hospital.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Schedule</CardTitle>
          <CardDescription>A complete list of all scheduled appointments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.patientName}</TableCell>
                  <TableCell>{appointment.doctorName}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[appointment.status]}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
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
