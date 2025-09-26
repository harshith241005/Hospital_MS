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
import { feedbacks } from "@/lib/data";
import { Star } from "lucide-react";

const RatingStars = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
            ))}
        </div>
    )
}


export default function FeedbackPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patient Feedback</h1>
        <p className="text-muted-foreground">
          View ratings and comments from patients.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feedback History</CardTitle>
          <CardDescription>A list of all patient feedback.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbacks.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell className="font-medium">{feedback.patientName}</TableCell>
                  <TableCell>{feedback.doctorName}</TableCell>
                   <TableCell>
                        <RatingStars rating={feedback.rating} />
                   </TableCell>
                  <TableCell>{feedback.comment}</TableCell>
                  <TableCell>{feedback.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
