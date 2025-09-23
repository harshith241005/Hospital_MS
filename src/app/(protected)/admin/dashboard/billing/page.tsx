'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { bills as initialBills, patients } from '@/lib/data';
import type { Bill } from '@/lib/types';
import { Download, Upload } from 'lucide-react';

export default function ManageBillingPage() {
  const [bills, setBills] = useState<Bill[]>(initialBills);
  const [newBill, setNewBill] = useState({
    patientId: '',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    details: '',
    status: 'pending' as 'paid' | 'pending',
    file: null as File | null,
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewBill((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (
    name: 'patientId' | 'status',
    value: string
  ) => {
    setNewBill((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewBill((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleAddBill = () => {
    if (
      !newBill.patientId ||
      !newBill.amount ||
      !newBill.details ||
      !newBill.file
    ) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill out all fields and select an invoice file.',
      });
      return;
    }

    const patient = patients.find((p) => p.id === newBill.patientId);
    if (!patient) return;

    const newBillData: Bill = {
      id: `B${String(bills.length + 1).padStart(3, '0')}`,
      patientId: newBill.patientId,
      patientName: patient.name,
      date: newBill.date,
      amount: parseFloat(newBill.amount),
      details: newBill.details,
      status: newBill.status,
      invoiceUrl: `/invoices/${newBill.file.name}`,
    };

    setBills((prev) => [newBillData, ...prev]);
    toast({
      title: 'Bill Created',
      description: `A new bill has been created for ${patient.name}.`,
    });

    // Reset form
    setNewBill({
      patientId: '',
      date: new Date().toISOString().split('T')[0],
      amount: '',
      details: '',
      status: 'pending',
      file: null,
    });
  };

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
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-7">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Create New Bill</CardTitle>
          <CardDescription>
            Fill out the form to create a new bill for a patient.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="patientId">Patient</Label>
            <Select
              onValueChange={(value) => handleSelectChange('patientId', value)}
              value={newBill.patientId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="details">Details</Label>
            <Input
              id="details"
              placeholder="e.g., Consultation Fee"
              value={newBill.details}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g., 1500"
                value={newBill.amount}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newBill.date}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              onValueChange={(value) => handleSelectChange('status', value)}
              value={newBill.status}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="file">Invoice File</Label>
            <Input id="file" type="file" onChange={handleFileChange} />
          </div>
          <Button onClick={handleAddBill}>
            <Upload className="mr-2 h-4 w-4" />
            Create Bill
          </Button>
        </CardContent>
      </Card>
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>All Bills</CardTitle>
          <CardDescription>
            A list of all bills generated in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">
                    {bill.patientName}
                  </TableCell>
                  <TableCell>{bill.date}</TableCell>
                  <TableCell>₹{bill.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={bill.status === 'paid' ? 'default' : 'secondary'}
                    >
                      {bill.status.charAt(0).toUpperCase() +
                        bill.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(bill)}
                    >
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
