'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { AutosaveStatus } from '@/features/documents/hooks/useAutosave';
import { cn } from '@/lib/utils';

type AutosaveIndicatorProps = {
  status: AutosaveStatus;
};

const STATUS_CONFIG: Record<
  AutosaveStatus,
  { label: string; dotClass: string; showSpinner?: boolean }
> = {
  saved: { label: 'Saved', dotClass: 'bg-emerald-500' },
  unsaved: { label: 'Unsaved changes', dotClass: 'bg-amber-500' },
  saving: { label: 'Saving…', dotClass: 'bg-blue-500', showSpinner: true },
  error: { label: 'Save failed', dotClass: 'bg-destructive' },
};

export function AutosaveIndicator({ status }: AutosaveIndicatorProps) {
  const config = STATUS_CONFIG[status];

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {config.showSpinner ? (
        <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
      ) : (
        <span className={cn('h-2 w-2 rounded-full', config.dotClass)} />
      )}
      <span>{config.label}</span>
    </div>
  );
}
