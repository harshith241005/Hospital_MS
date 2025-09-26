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
import { staff as initialStaff } from "@/lib/data";
import { Staff } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const initialStaffState: Omit<Staff, 'id'> = {
    name: '',
    role: '',
    email: '',
    phone: '',
};

export default function ManageStaffPage() {
  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [selectedStaff, setSelectedStaff] = useState<Staff | Omit<Staff, 'id'>>(initialStaffState);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSelectedStaff(prev => ({ ...prev!, [id]: value }));
  };
  
  const handleAddNewStaff = () => {
    const newStaff: Staff = {
      id: `S${String(staff.length + 1).padStart(3, '0')}`,
      ...(selectedStaff as Omit<Staff, 'id'>),
    };
    setStaff(prev => [...prev, newStaff]);
    setIsAddDialogOpen(false);
  };

  const handleEditStaff = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setIsEditDialogOpen(true);
  };

  const handleUpdateStaff = () => {
      setStaff(prev => prev.map(s => s.id === (selectedStaff as Staff).id ? selectedStaff as Staff : s));
      setIsEditDialogOpen(false);
  };
  
  const handleDeleteStaff = (staffId: string) => {
      setStaff(prev => prev.filter(s => s.id !== staffId));
  }


  return (
    <div className="space-y-4">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Staff</h1>
          <p className="text-muted-foreground">Add, edit, or remove staff members.</p>
        </div>
         <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedStaff(initialStaffState)}>Add New Staff</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Staff</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new staff member.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" value={selectedStaff.name} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">Role</Label>
                <Input id="role" value={selectedStaff.role} onChange={handleInputChange} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" value={selectedStaff.email} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input id="phone" type="tel" value={selectedStaff.phone} onChange={handleInputChange} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddNewStaff}>Save Staff</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff List</CardTitle>
          <CardDescription>A list of all staff members.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEditStaff(member)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteStaff(member.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

        {/* Edit Staff Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Staff Details</DialogTitle>
              <DialogDescription>
                Update the staff member's information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" value={selectedStaff.name} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">Role</Label>
                <Input id="role" value={selectedStaff.role} onChange={handleInputChange} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" value={selectedStaff.email} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input id="phone" type="tel" value={selectedStaff.phone} onChange={handleInputChange} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={handleUpdateStaff}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  );
}
