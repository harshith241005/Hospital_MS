'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { rooms as initialRooms } from "@/lib/data";
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


const getStatusColor = (status: 'available' | 'occupied') => {
    return status === 'available' ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800';
}

export default function RoomManagementPage() {
    const [rooms, setRooms] = useState<Room[]>(initialRooms);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [newCapacity, setNewCapacity] = useState<number>(0);

    const handleEditClick = (room: Room) => {
        setSelectedRoom(room);
        setNewCapacity(room.capacity);
        setIsEditDialogOpen(true);
    };

    const handleSaveChanges = () => {
        if (selectedRoom) {
            setRooms(rooms.map(r => r.id === selectedRoom.id ? { ...r, capacity: newCapacity } : r));
        }
        setIsEditDialogOpen(false);
        setSelectedRoom(null);
    };

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
                                {room.status === 'occupied' ? (
                                    <div className="flex items-center text-xs pt-2">
                                        <User className="h-3 w-3 mr-1" />
                                        <span>{room.patientName}</span>
                                    </div>
                                ) : (
                                     <div className="text-xs pt-2 text-green-800 font-semibold">
                                        Available
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Edit Capacity Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Edit Room Capacity</DialogTitle>
                    <DialogDescription>
                        Update the bed capacity for room {selectedRoom?.number}.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="capacity" className="text-right">
                        Capacity
                        </Label>
                        <Input
                        id="capacity"
                        type="number"
                        value={newCapacity}
                        onChange={(e) => setNewCapacity(Number(e.target.value))}
                        className="col-span-3"
                        />
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
