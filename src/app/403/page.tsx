import React from 'react';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ForbiddenPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 text-center">
      <ShieldAlert className="h-16 w-16 text-destructive mb-6" />
      <h1 className="text-4xl font-bold mb-2">403</h1>
      <h2 className="text-xl font-semibold mb-3">Access Forbidden</h2>
      <p className="text-muted-foreground max-w-sm mb-8">
        You don&apos;t have permission to view this page. Admin access is required.
      </p>
      <Button asChild>
        <Link href="/dashboard">Go back to dashboard</Link>
      </Button>
    </main>
  );
}
