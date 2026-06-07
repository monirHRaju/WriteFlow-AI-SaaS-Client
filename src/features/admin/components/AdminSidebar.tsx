'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Star, LogOut, ShieldCheck, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/features/auth/hooks/useAuth';
import { useAppSelector } from '@/store';

const NAV_ITEMS = [
  { href: '/admin',         label: 'Overview',  icon: LayoutDashboard },
  { href: '/admin/users',   label: 'Users',     icon: Users },
  { href: '/admin/reviews', label: 'Reviews',   icon: Star },
];

export function AdminSidebar() {
  const pathname      = usePathname();
  const user          = useAppSelector((state) => state.auth.user);
  const logoutMutation = useLogout();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/30 min-h-screen">
      {/* Brand */}
      <div className="h-16 flex items-center gap-2 px-6 border-b border-border">
        <ShieldCheck className="h-5 w-5 text-primary" />
        <Link href="/admin" className="text-lg font-semibold tracking-tight">
          Admin Panel
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-accent/40"
        >
          ← Back to app
        </Link>
        <p className="text-xs text-muted-foreground truncate px-1">{user?.email}</p>
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
  );
}
