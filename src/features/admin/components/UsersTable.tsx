'use client';

import React from 'react';
import { Loader2, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminUser } from '../types/admin.types';
import { useUpdateUserRole, useUpdateUserStatus } from '../hooks/useAdminData';
import { cn } from '@/lib/utils';

type Props = {
  users: AdminUser[];
  currentUserId: string;
};

const ROLES = ['ADMIN', 'EDITOR', 'VIEWER'] as const;

const ROLE_COLORS: Record<string, string> = {
  ADMIN:  'text-red-400 bg-red-400/10',
  EDITOR: 'text-blue-400 bg-blue-400/10',
  VIEWER: 'text-muted-foreground bg-muted/30',
};

const PLAN_COLORS: Record<string, string> = {
  FREE: 'text-muted-foreground',
  PRO:  'text-purple-400',
  TEAM: 'text-emerald-400',
};

export function UsersTable({ users, currentUserId }: Props) {
  const roleMutation   = useUpdateUserRole();
  const statusMutation = useUpdateUserStatus();

  if (!users.length) {
    return <p className="text-sm text-muted-foreground py-8 text-center">No users found.</p>;
  }

  return (
    <div className="rounded-lg border border-border overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted/30 border-b border-border">
          <tr>
            {['User', 'Plan', 'Role', 'Docs', 'Status', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isSelf = user.id === currentUserId;
            const isPending =
              (roleMutation.isPending   && (roleMutation.variables as any)?.id === user.id) ||
              (statusMutation.isPending && (statusMutation.variables as any)?.id === user.id);

            return (
              <tr key={user.id} className="border-b border-border last:border-0 hover:bg-accent/20 transition-colors">
                {/* User info */}
                <td className="px-4 py-3">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </td>

                {/* Plan */}
                <td className={cn('px-4 py-3 font-medium', PLAN_COLORS[user.plan])}>
                  {user.plan}
                </td>

                {/* Role dropdown */}
                <td className="px-4 py-3">
                  <select
                    value={user.role}
                    disabled={isSelf || isPending}
                    onChange={(e) =>
                      roleMutation.mutate({
                        id:   user.id,
                        data: { role: e.target.value as 'ADMIN' | 'EDITOR' | 'VIEWER' },
                      })
                    }
                    className={cn(
                      'text-xs rounded-md px-2 py-1 font-medium border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50',
                      ROLE_COLORS[user.role]
                    )}
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Docs count */}
                <td className="px-4 py-3 text-muted-foreground">
                  {user._count?.documents ?? '—'}
                </td>

                {/* Status badge */}
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
                      user.isActive
                        ? 'bg-emerald-400/10 text-emerald-400'
                        : 'bg-red-400/10 text-red-400'
                    )}
                  >
                    {user.isActive ? (
                      <><ShieldCheck className="h-3 w-3" /> Active</>
                    ) : (
                      <><ShieldAlert className="h-3 w-3" /> Banned</>
                    )}
                  </span>
                </td>

                {/* Ban / Unban */}
                <td className="px-4 py-3">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isSelf || isPending}
                    onClick={() =>
                      statusMutation.mutate({ id: user.id, data: { isActive: !user.isActive } })
                    }
                    className={cn(
                      'text-xs h-7',
                      user.isActive
                        ? 'border-red-400/40 text-red-400 hover:bg-red-400/10'
                        : 'border-emerald-400/40 text-emerald-400 hover:bg-emerald-400/10'
                    )}
                  >
                    {isPending ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : user.isActive ? (
                      'Ban'
                    ) : (
                      'Unban'
                    )}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
