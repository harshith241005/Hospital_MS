'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { patients as initialPatients } from "@/lib/data";
import { Patient } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

const initialPatientState: Omit<Patient, 'id'> = {
    name: '',
    age: 0,
    gender: '',
    disease: '',
    doctorAssigned: '',
    contact: '',
    email: '',
};

export default function ManagePatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | Omit<Patient, 'id'>>(initialPatientState);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSelectedPatient(prev => ({ ...prev!, [id]: value }));
  };

  const handleAddNewPatient = () => {
    const newPatient: Patient = {
      id: `P${String(patients.length + 1).padStart(3, '0')}`,
      ...selectedPatient as Omit<Patient, 'id'>,
      age: Number((selectedPatient as Omit<Patient, 'id'>).age)
    };
    setPatients(prev => [...prev, newPatient]);
    setIsAddDialogOpen(false);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditDialogOpen(true);
  };

  const handleUpdatePatient = () => {
      setPatients(prev => prev.map(p => p.id === (selectedPatient as Patient).id ? { ...selectedPatient, age: Number(selectedPatient.age) } as Patient : p));
      setIsEditDialogOpen(false);
  };
  
  const handleDeletePatient = (patientId: string) => {
      setPatients(prev => prev.filter(p => p.id !== patientId));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Patients</h1>
          <p className="text-muted-foreground">
            Add, edit, or remove patient records.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedPatient(initialPatientState)}>Add New Patient</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new patient.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" value={selectedPatient.name} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">Age</Label>
                <Input id="age" type="number" value={selectedPatient.age} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">Gender</Label>
                <Input id="gender" value={selectedPatient.gender} onChange={handleInputChange} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="disease" className="text-right">Condition</Label>
                <Input id="disease" value={selectedPatient.disease} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doctorAssigned" className="text-right">Doctor</Label>
                <Input id="doctorAssigned" value={selectedPatient.doctorAssigned} onChange={handleInputChange} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">Contact</Label>
                <Input id="contact" type="tel" value={selectedPatient.contact} onChange={handleInputChange} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" value={selectedPatient.email} onChange={handleInputChange} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddNewPatient}>Save Patient</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient List</CardTitle>
          <CardDescription>
            A list of all patients registered in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Doctor Assigned</TableHead>
                <TableHead>Contact</TableHead>
                 <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.disease}</TableCell>
                  <TableCell>{patient.doctorAssigned}</TableCell>
                  <TableCell>{patient.contact}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditPatient(patient)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeletePatient(patient.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Edit Patient Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Patient Details</DialogTitle>
              <DialogDescription>
                Update the patient's information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" value={selectedPatient.name} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">Age</Label>
                <Input id="age" type="number" value={selectedPatient.age} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">Gender</Label>
                <Input id="gender" value={selectedPatient.gender} onChange={handleInputChange} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="disease" className="text-right">Condition</Label>
                <Input id="disease" value={selectedPatient.disease} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doctorAssigned" className="text-right">Doctor</Label>
                <Input id="doctorAssigned" value={selectedPatient.doctorAssigned} onChange={handleInputChange} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">Contact</Label>
                <Input id="contact" type="tel" value={selectedPatient.contact} onChange={handleInputChange} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" value={selectedPatient.email} onChange={handleInputChange} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={handleUpdatePatient}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  );
}
