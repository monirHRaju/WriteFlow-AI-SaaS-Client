'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Archive, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Document } from '@/features/documents/types/document.types';
import { useArchiveDocument } from '@/features/documents/hooks/useDocuments';
import { cn } from '@/lib/utils';

type DocumentRowProps = {
  document: Document;
};

const STATUS_STYLES: Record<string, string> = {
  DRAFT: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  PUBLISHED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  ARCHIVED: 'bg-muted text-muted-foreground border-border',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function DocumentRow({ document }: DocumentRowProps) {
  const router = useRouter();
  const archiveMutation = useArchiveDocument();

  const handleArchive = () => {
    if (!confirm(`Archive "${document.title}"?`)) return;
    archiveMutation.mutate(document.id);
  };

  return (
    <tr className="border-b border-border hover:bg-accent/20 transition-colors">
      <td className="px-4 py-3">
        <Link
          href={`/documents/${document.id}/edit`}
          className="font-medium hover:text-primary transition-colors line-clamp-1"
        >
          {document.title}
        </Link>
      </td>
      <td className="px-4 py-3">
        <span
          className={cn(
            'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
            STATUS_STYLES[document.status]
          )}
        >
          {document.status}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">
        {document.tokensUsed.toLocaleString()}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
        {formatDate(document.updatedAt)}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/documents/${document.id}/edit`)}
            aria-label="Edit document"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          {document.status !== 'ARCHIVED' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleArchive}
              disabled={archiveMutation.isPending}
              aria-label="Archive document"
            >
              {archiveMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Archive className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}
