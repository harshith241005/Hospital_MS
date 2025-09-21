'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { rooms } from "@/lib/data";
import { cn } from "@/lib/utils";
import { BedDouble, User } from "lucide-react";

const getStatusColor = (status: 'available' | 'occupied') => {
    return status === 'available' ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800';
}

export default function RoomManagementPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Room & Bed Management</h1>
                <p className="text-muted-foreground">Visualize and manage hospital room occupancy.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Occupancy Grid</CardTitle>
                    <CardDescription>Current status of all hospital rooms.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {rooms.map(room => (
                            <div key={room.id} className={cn("rounded-lg border p-4 flex flex-col items-center justify-center space-y-2 transition-all hover:shadow-md", getStatusColor(room.status))}>
                                <BedDouble className="h-8 w-8" />
                                <div className="text-center">
                                    <p className="font-bold text-lg">{room.number}</p>
                                    <p className="text-sm">{room.type}</p>
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
        </div>
    )
}
