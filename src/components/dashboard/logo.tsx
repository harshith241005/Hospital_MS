import { Hospital } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Hospital className="h-6 w-6 text-primary" />
      <h1 className="text-lg font-bold text-primary-foreground">MediSync Pro</h1>
    </div>
  );
}
