'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type AuthLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col items-center justify-center px-4 py-12">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mb-8 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/10 bg-primary/5 text-primary text-xs font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          WriteFlow AI
        </div>
        <p className="text-sm text-muted-foreground max-w-sm">
          Premium multi-role SaaS content workspace powered by cooperative AI agents.
        </p>
      </div>

      <Card className="w-full max-w-md z-10 border-border/60 bg-card/80 backdrop-blur-md shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
}
