
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { doctors, patients } from '@/lib/data';
import { scheduleAppointment } from '@/ai/flows/ai-powered-appointment-scheduler';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/use-auth';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  patient: z.string().min(1, 'Please select a patient.'),
  doctor: z.string().min(1, 'Please select a doctor.'),
  date: z.string().min(1, 'Please enter a preferred date.'),
  requirements: z.string().optional(),
});

export default function BookAppointmentPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    appointmentDetails: string;
    confirmationMessage: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patient: '',
      doctor: '',
      date: '',
      requirements: '',
    },
  });

  useEffect(() => {
    if (user) {
      const currentPatient = patients.find(p => p.email === user.email);
      if (currentPatient) {
        form.setValue('patient', currentPatient.id);
      }
    }
  }, [user, form]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);

    const selectedDoctor = doctors.find((d) => d.id === values.doctor);
    const selectedPatient = patients.find((p) => p.id === values.patient);
    if (!selectedDoctor || !selectedPatient) return;

    const input = {
      patientName: selectedPatient.name,
      doctorName: selectedDoctor.name,
      availableTimeSlots: selectedDoctor.availability,
      preferredDate: values.date,
      patientRequirements: values.requirements,
    };

    try {
      const response = await scheduleAppointment(input);
      setResult(response);
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Book Appointment</h1>
        <p className="text-muted-foreground">
          Use our AI assistant to help schedule your appointment.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>New Appointment Request</CardTitle>
          <CardDescription>
            Select a doctor and provide your preferences. Our AI will find a
            suitable slot for you.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
               <FormField
                control={form.control}
                name="patient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a patient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {patients.map((pat) => (
                          <SelectItem key={pat.id} value={pat.id}>
                            {pat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="doctor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a doctor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {doctors.map((doc) => (
                          <SelectItem key={doc.id} value={doc.id}>
                            {doc.name} - {doc.specialization}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Date</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Tomorrow, Next Monday, August 25th" {...field} />
                    </FormControl>
                    <FormDescription>
                      You can use natural language.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Requirements (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I prefer an afternoon appointment, Need wheelchair access."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Booking...' : 'Book'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
        {result && (
        <Alert>
          <AlertTitle>Appointment Request Submitted!</AlertTitle>
          <AlertDescription className="space-y-2">
            <p className="font-semibold">
              {result.confirmationMessage}
            </p>
            <p>{result.appointmentDetails}</p>
          </AlertDescription>
        </Alert>
        )}
    </div>
  );
}
