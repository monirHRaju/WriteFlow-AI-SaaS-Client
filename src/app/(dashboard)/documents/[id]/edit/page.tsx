'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { WriteFlowEditor } from '@/features/documents/components/editor/WriteFlowEditor';
import { useDocument } from '@/features/documents/hooks/useDocument';

export default function DocumentEditPage() {
  const params = useParams();
  const documentId = params.id as string;
  const { data: document, isLoading, isError, error } = useDocument(documentId);
  const [title, setTitle] = useState<string | undefined>(undefined);

  const displayTitle = title ?? document?.title ?? 'Untitled';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !document) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 px-4">
        <p className="text-destructive text-sm">
          {error instanceof Error ? error.message : 'Failed to load document.'}
        </p>
        <Link href="/documents" className="text-sm text-primary hover:underline">
          Back to documents
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 space-y-6">
      <Link
        href="/documents"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Documents
      </Link>

      <Input
        value={displayTitle}
        onChange={(e) => setTitle(e.target.value)}
        className="text-2xl font-bold border-none bg-transparent px-0 h-auto focus-visible:ring-0 shadow-none"
        placeholder="Document title"
      />

      <WriteFlowEditor
        documentId={documentId}
        initialContent={document.content || '<p></p>'}
        title={displayTitle}
      />
    </div>
  );
}
