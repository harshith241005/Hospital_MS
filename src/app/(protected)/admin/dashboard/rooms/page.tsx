'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { rooms as initialRooms, patients as allPatients } from "@/lib/data";
import { Room } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BedDouble, User, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";


const getStatusColor = (status: 'available' | 'occupied') => {
    return status === 'available' ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800';
}

export default function RoomManagementPage() {
    const [rooms, setRooms] = useState<Room[]>(initialRooms);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    
    const handleEditClick = (room: Room) => {
        setSelectedRoom(room);
        setIsEditDialogOpen(true);
    };

    const handleSaveChanges = () => {
        if (selectedRoom) {
            setRooms(rooms.map(r => r.id === selectedRoom.id ? { ...selectedRoom } : r));
        }
        setIsEditDialogOpen(false);
        setSelectedRoom(null);
    };

    const handleCapacityChange = (value: string) => {
        if (selectedRoom) {
            const newCapacity = Number(value);
            const currentPatients = selectedRoom.patients;
            const updatedPatients = currentPatients.slice(0, newCapacity);
            setSelectedRoom({ ...selectedRoom, capacity: newCapacity, patients: updatedPatients });
        }
    }
    
    const handlePatientChange = (index: number, patientId: string) => {
        if (selectedRoom) {
            const patient = allPatients.find(p => p.id === patientId);
            if (patient) {
                const updatedPatients = [...selectedRoom.patients];
                updatedPatients[index] = { id: patient.id, name: patient.name };
                setSelectedRoom({ ...selectedRoom, patients: updatedPatients });
            }
        }
    }

    const handleAddPatientSlot = () => {
        if (selectedRoom && selectedRoom.patients.length < selectedRoom.capacity) {
            const newPatient = allPatients[0]; // default to first patient
            setSelectedRoom({
                ...selectedRoom,
                patients: [...selectedRoom.patients, { id: newPatient.id, name: newPatient.name }]
            });
        }
    }

    const handleRemovePatient = (index: number) => {
        if (selectedRoom) {
            const updatedPatients = selectedRoom.patients.filter((_, i) => i !== index);
            setSelectedRoom({ ...selectedRoom, patients: updatedPatients });
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Room & Bed Management</h1>
                <p className="text-muted-foreground">Visualize and manage hospital room occupancy and capacity.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Occupancy Grid</CardTitle>
                    <CardDescription>Current status and capacity of all hospital rooms.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {rooms.map(room => (
                            <div key={room.id} className={cn("rounded-lg border p-4 flex flex-col items-center justify-center space-y-2 transition-all hover:shadow-md relative", getStatusColor(room.status))}>
                                <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-7 w-7" onClick={() => handleEditClick(room)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <BedDouble className="h-8 w-8" />
                                <div className="text-center">
                                    <p className="font-bold text-lg">{room.number}</p>
                                    <p className="text-sm">{room.type}</p>
                                    <p className="text-xs text-muted-foreground">Capacity: {room.capacity}</p>
                                </div>
                                <div className="flex flex-col items-center text-xs pt-2 w-full">
                                    {room.patients.length > 0 ? (
                                        room.patients.map(p => (
                                            <div key={p.id} className="flex items-center">
                                                <User className="h-3 w-3 mr-1" />
                                                <span>{p.name}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-xs pt-2 text-green-800 font-semibold">
                                            Available
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Edit Room Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                    <DialogTitle>Edit Room Details</DialogTitle>
                    <DialogDescription>
                        Update capacity and patient assignments for room {selectedRoom?.number}.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="capacity" className="text-right">
                                Capacity
                            </Label>
                            <Input
                                id="capacity"
                                type="number"
                                value={selectedRoom?.capacity || 0}
                                onChange={(e) => handleCapacityChange(e.target.value)}
                                className="col-span-3"
                                min="1"
                            />
                        </div>

                        <div className="space-y-4">
                            <Label>Patient Assignments</Label>
                             {selectedRoom && Array.from({ length: selectedRoom.patients.length }).map((_, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Select
                                        value={selectedRoom.patients[index]?.id || ''}
                                        onValueChange={(patientId) => handlePatientChange(index, patientId)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a patient" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {allPatients.map((p) => (
                                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Button variant="ghost" size="icon" onClick={() => handleRemovePatient(index)}>
                                        <X className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                             {selectedRoom && selectedRoom.patients.length < selectedRoom.capacity && (
                                <Button variant="outline" size="sm" onClick={handleAddPatientSlot} className="w-full">
                                    Add Patient
                                </Button>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleSaveChanges}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
