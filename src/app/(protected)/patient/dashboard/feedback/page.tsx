'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { doctors } from "@/lib/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  doctor: z.string().min(1, 'Please select a doctor.'),
  rating: z.number().min(1, 'Please provide a rating.'),
  comment: z.string().optional(),
});

const StarRating = ({ rating, setRating }: { rating: number, setRating: (rating: number) => void }) => {
    return (
        <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
                <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    className="focus:outline-none"
                >
                    <Star
                        className={`h-6 w-6 transition-colors ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
                    />
                </button>
            ))}
        </div>
    )
}

export default function FeedbackPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctor: '',
      rating: 0,
      comment: '',
    },
  });

  const rating = form.watch('rating');

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
        title: "Feedback Submitted!",
        description: "Thank you for your valuable feedback."
    });
    form.reset();
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Provide Feedback</h1>
        <p className="text-muted-foreground">
          Share your experience with our doctors.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feedback Form</CardTitle>
          <CardDescription>
            Your feedback helps us improve our services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <StarRating rating={rating} setRating={(r) => field.onChange(r)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comments (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us more about your experience..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit Feedback</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
