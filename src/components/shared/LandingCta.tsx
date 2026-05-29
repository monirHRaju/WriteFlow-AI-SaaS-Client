'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useAppSelector } from '@/store';

export function LandingCta() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const href = isAuthenticated ? '/dashboard' : '/login';
  const label = isAuthenticated ? 'Go to Dashboard' : 'Enter Workspace';

  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-foreground/5"
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4" />
    </Link>
  );
}
