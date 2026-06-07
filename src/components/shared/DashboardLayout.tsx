'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Compass,
  User,
  LogOut,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/features/auth/hooks/useAuth';
import { useAppSelector } from '@/store';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/profile', label: 'Profile', icon: User },
];

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);
  const logoutMutation = useLogout();

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/30">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/dashboard" className="text-lg font-semibold tracking-tight">
            WriteFlow AI
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname === href || pathname.startsWith(`${href}/`)
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2 truncate">{user?.email}</p>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
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
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden h-14 border-b border-border flex items-center justify-between px-4">
          <Link href="/dashboard" className="font-semibold">
            WriteFlow AI
          </Link>
          <nav className="flex gap-2">
            {NAV_ITEMS.map(({ href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'p-2 rounded-md',
                  pathname === href ? 'bg-accent' : 'text-muted-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </nav>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
