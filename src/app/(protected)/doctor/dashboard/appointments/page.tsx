
'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/auth/use-auth";
import { appointments as initialAppointments, doctors } from "@/lib/data";
import type { Appointment } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";
import { useState, useMemo } from "react";

const statusVariant = {
    pending: 'secondary',
    confirmed: 'default',
    completed: 'outline',
    cancelled: 'destructive'
} as const;


export default function ManageAppointmentsPage() {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
    
    const doctor = useMemo(() => doctors.find(d => d.email === user?.email), [user?.email]);
    const doctorAppointments = useMemo(() => appointments.filter(a => a.doctorId === doctor?.id), [appointments, doctor?.id]);

    const handleStatusChange = (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => {
        setAppointments(prev => 
            prev.map(app => 
                app.id === appointmentId ? { ...app, status: newStatus } : app
            )
        );
    };
    
    const openRescheduleDialog = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setIsRescheduleOpen(true);
    };

    const handleReschedule = () => {
        if (selectedAppointment) {
            setAppointments(prev => 
                prev.map(app => 
                    app.id === selectedAppointment.id ? { ...selectedAppointment, status: 'confirmed' } : app
                )
            );
            setIsRescheduleOpen(false);
            setSelectedAppointment(null);
        }
    };

    const handleRescheduleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedAppointment) {
            setSelectedAppointment({
                ...selectedAppointment,
                [e.target.id]: e.target.value,
            });
        }
    };


  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Appointments</h1>
        <p className="text-muted-foreground">Approve, reject, or reschedule patient appointments.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Appointments</CardTitle>
          <CardDescription>A list of your scheduled appointments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctorAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.patientName}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                     <Badge variant={statusVariant[appointment.status]}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{appointment.doctorName}</TableCell>
                  <TableCell>
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'confirmed')}>Approve</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'cancelled')}>Reject</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openRescheduleDialog(appointment)}>Reschedule</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

        {/* Reschedule Dialog */}
        <Dialog open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reschedule Appointment</DialogTitle>
                    <DialogDescription>
                        Update the date and time for the appointment with {selectedAppointment?.patientName}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">Date</Label>
                        <Input id="date" type="date" value={selectedAppointment?.date} onChange={handleRescheduleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right">Time</Label>
                        <Input id="time" type="time" value={selectedAppointment?.time} onChange={handleRescheduleInputChange} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsRescheduleOpen(false)}>Cancel</Button>
                    <Button onClick={handleReschedule}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
