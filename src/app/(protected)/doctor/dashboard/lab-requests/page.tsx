import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LabRequestsPage() {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Lab Requests</h1>
                <p className="text-muted-foreground">Create and track lab test requests for patients.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Feature Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This section will allow you to create new requests for lab tests, view the status of existing requests, and see the results once they are available.</p>
                </CardContent>
            </Card>
        </div>
    )
}