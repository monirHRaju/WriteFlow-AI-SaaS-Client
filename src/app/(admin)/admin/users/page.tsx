'use client';

import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminUsers } from '@/features/admin/hooks/useAdminData';
import { UsersTable } from '@/features/admin/components/UsersTable';
import { useAppSelector } from '@/store';
import { useDebounce } from '@/hooks/useDebounce';

const ROLE_OPTIONS = [
  { label: 'All roles',  value: '' },
  { label: 'Admin',      value: 'ADMIN' },
  { label: 'Editor',     value: 'EDITOR' },
  { label: 'Viewer',     value: 'VIEWER' },
];

export default function AdminUsersPage() {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [page,   setPage]   = useState(1);
  const [search, setSearch] = useState('');
  const [role,   setRole]   = useState('');

  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading, isError } = useAdminUsers({
    page,
    limit:  10,
    search: debouncedSearch || undefined,
    role:   role || undefined,
  });

  const meta  = data?.meta;
  const users = data?.data ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage roles and account status for all registered users.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
          />
        </div>
        <select
          value={role}
          onChange={(e) => { setRole(e.target.value); setPage(1); }}
          className="text-sm rounded-md px-3 py-2 border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
        >
          {ROLE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          Failed to load users.
        </div>
      ) : (
        <UsersTable users={users} currentUserId={currentUser?.id ?? ''} />
      )}

      {/* Pagination */}
      {meta && meta.totalPage > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Page {meta.page} of {meta.totalPage} &nbsp;·&nbsp; {meta.total} users
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page >= meta.totalPage}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
