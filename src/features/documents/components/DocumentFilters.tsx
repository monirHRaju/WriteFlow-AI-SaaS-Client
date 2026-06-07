'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DocumentStatus } from '@/features/documents/types/document.types';

type DocumentFiltersProps = {
  search: string;
  status: DocumentStatus | '';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: DocumentStatus | '') => void;
};

const STATUS_OPTIONS: { value: DocumentStatus | ''; label: string }[] = [
  { value: '', label: 'All statuses' },
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PUBLISHED', label: 'Published' },
  { value: 'ARCHIVED', label: 'Archived' },
];

export function DocumentFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: DocumentFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as DocumentStatus | '')}
        className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value || 'all'} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
