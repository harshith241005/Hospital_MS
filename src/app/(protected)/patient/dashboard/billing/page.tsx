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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/auth/use-auth";
import { bills, patients } from "@/lib/data";
import { Download } from "lucide-react";
import type { Bill } from '@/lib/types';

export default function BillingPage() {
  const { user } = useAuth();
  
  const patient = patients.find(p => p.email === user?.email);
  const myBills = bills.filter(b => b.patientId === patient?.id);

  const handleDownload = (bill: Bill) => {
    const content = `Invoice
-----------------
Patient: ${bill.patientName}
Date: ${bill.date}
Details: ${bill.details}
Amount: ₹${bill.amount.toLocaleString()}
Status: ${bill.status}

This is a sample invoice file.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${bill.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Payments</h1>
        <p className="text-muted-foreground">
          View your invoices and payment history.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A list of all your bills.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myBills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.patientName}</TableCell>
                  <TableCell>{bill.date}</TableCell>
                  <TableCell>{bill.details}</TableCell>
                  <TableCell>₹{bill.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={bill.status === 'paid' ? 'default' : 'secondary'}>
                      {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleDownload(bill)}>
                      <Download className="mr-2 h-4 w-4" />
                      Invoice
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
