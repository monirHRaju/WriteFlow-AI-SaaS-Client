'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { Input } from '@/components/ui/input';
import { WriteFlowEditor } from '@/features/documents/components/editor/WriteFlowEditor';
import { useDocument } from '@/features/documents/hooks/useDocument';

function DocumentEditContent() {
  const params = useParams();
  const documentId = params.id as string;
  const { data: document, isLoading, isError, error } = useDocument(documentId);
  const [title, setTitle] = useState<string | undefined>(undefined);

  const displayTitle = title ?? document?.title ?? 'Untitled';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !document) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4 px-4">
        <p className="text-destructive text-sm">
          {error instanceof Error ? error.message : 'Failed to load document.'}
        </p>
        <Link href="/dashboard" className="text-sm text-primary hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto flex h-14 items-center gap-4 px-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
      </header>

      <section className="container mx-auto max-w-4xl px-4 py-8 space-y-6">
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
      </section>
    </main>
  );
}

export default function DocumentEditPage() {
  return (
    <ProtectedRoute>
      <DocumentEditContent />
    </ProtectedRoute>
  );
}
