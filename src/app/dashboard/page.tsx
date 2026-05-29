'use client';

import React from 'react';
import { Loader2, LogOut } from 'lucide-react';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store';
import { useLogout } from '@/features/auth/hooks/useAuth';

function DashboardContent() {
  const user = useAppSelector((state) => state.auth.user);
  const logoutMutation = useLogout();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-lg font-semibold">WriteFlow AI</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            Sign out
          </Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          Welcome back{user?.name ? `, ${user.name}` : ''}
        </h2>
        <p className="text-muted-foreground mb-6">
          You are signed in as <span className="text-foreground font-medium">{user?.email}</span>
          {user?.role && (
            <span className="ml-2 inline-flex items-center rounded-md border border-border px-2 py-0.5 text-xs">
              {user.role}
            </span>
          )}
        </p>
        <div className="rounded-lg border border-border bg-card/50 p-6 max-w-2xl">
          <p className="text-sm text-muted-foreground">
            Your dashboard workspace is ready. Document editing, AI agents, and team features will
            appear here as modules are built.
          </p>
        </div>
      </section>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
