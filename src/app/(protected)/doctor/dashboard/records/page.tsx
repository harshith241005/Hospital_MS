import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PatientRecordsPage() {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Patient Medical Records</h1>
                <p className="text-muted-foreground">View patient medical history and reports.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Feature Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This section will allow you to search for patients and view their complete medical records, including past appointments, prescriptions, and uploaded reports.</p>
                </CardContent>
            </Card>
        </div>
    )
}