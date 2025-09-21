'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function AboutHospitalPage() {
    const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('about-gallery'));

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">About MediTrack Pro</h1>
                <p className="text-muted-foreground">Learn more about our facilities and services.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Our Facilities</CardTitle>
                    <CardDescription>A glimpse into our state-of-the-art infrastructure.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {galleryImages.map(image => (
                            <div key={image.id} className="overflow-hidden rounded-lg">
                                <div className="relative aspect-video">
                                    <Image
                                        src={image.imageUrl}
                                        alt={image.description}
                                        fill
                                        className="object-cover transition-transform hover:scale-105"
                                        data-ai-hint={image.imageHint}
                                    />
                                </div>
                                <p className="text-center text-sm text-muted-foreground mt-2">{image.description}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
