'use server';
/**
 * @fileOverview This file defines an AI-powered appointment scheduler flow.
 *
 * It allows patients to view available time slots from their doctor and schedule an appointment, subject to doctor's approval.
 * The flow uses a Genkit prompt to interact with the LLM and extract the appointment details.
 *
 * @exports `scheduleAppointment` - The main function to schedule an appointment.
 * @exports `ScheduleAppointmentInput` - The input type for the `scheduleAppointment` function.
 * @exports `ScheduleAppointmentOutput` - The output type for the `scheduleAppointment` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const ScheduleAppointmentInputSchema = z.object({
  patientName: z.string().describe('The name of the patient.'),
  doctorName: z.string().describe('The name of the doctor.'),
  availableTimeSlots: z.string().describe('Available time slots for the doctor.'),
  preferredDate: z.string().describe('The preferred date for the appointment.'),
  patientRequirements: z.string().optional().describe('Any specific requirements from the patient.'),
});

export type ScheduleAppointmentInput = z.infer<typeof ScheduleAppointmentInputSchema>;

const ScheduleAppointmentOutputSchema = z.object({
  appointmentDetails: z.string().describe('A summary of the scheduled appointment details.'),
  confirmationMessage: z.string().describe('A message confirming the appointment request and its pending approval.'),
});

export type ScheduleAppointmentOutput = z.infer<typeof ScheduleAppointmentOutputSchema>;

export async function scheduleAppointment(input: ScheduleAppointmentInput): Promise<ScheduleAppointmentOutput> {
  return scheduleAppointmentFlow(input);
}

const scheduleAppointmentPrompt = ai.definePrompt({
  name: 'scheduleAppointmentPrompt',
  input: {
    schema: ScheduleAppointmentInputSchema,
  },
  output: {
    schema: ScheduleAppointmentOutputSchema,
  },
  prompt: `You are an AI assistant helping patients schedule appointments with doctors.

  Based on the provided information, create a summary of the appointment details and a confirmation message for the patient.

  Patient Name: {{{patientName}}}
  Doctor Name: {{{doctorName}}}
  Available Time Slots: {{{availableTimeSlots}}}
  Preferred Date: {{{preferredDate}}}
  Patient Requirements: {{{patientRequirements}}}

  Output:
  Appointment Details: A summary of the scheduled appointment including patient name, doctor name, date, time, and any special requirements.
  Confirmation Message: A message to the patient confirming their appointment request and informing them that it is pending doctor's approval.

  Ensure the output is clear and concise.
`,
});

const scheduleAppointmentFlow = ai.defineFlow(
  {
    name: 'scheduleAppointmentFlow',
    inputSchema: ScheduleAppointmentInputSchema,
    outputSchema: ScheduleAppointmentOutputSchema,
  },
  async input => {
    const {output} = await scheduleAppointmentPrompt(input);
    return output!;
  }
);
