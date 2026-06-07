'use client';

import React from 'react';
import { Loader2, FileText } from 'lucide-react';
import { Document } from '@/features/documents/types/document.types';
import { DocumentRow } from '@/features/documents/components/DocumentRow';

type DocumentListProps = {
  documents: Document[];
  isLoading?: boolean;
  emptyMessage?: string;
};

export function DocumentList({
  documents,
  isLoading,
  emptyMessage = 'No documents found.',
}: DocumentListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FileText className="h-10 w-10 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Title
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Status
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                Tokens
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                Last edited
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <DocumentRow key={doc.id} document={doc} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
