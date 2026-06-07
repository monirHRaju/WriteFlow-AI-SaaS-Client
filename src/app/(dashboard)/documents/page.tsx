'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocumentFilters } from '@/features/documents/components/DocumentFilters';
import { DocumentList } from '@/features/documents/components/DocumentList';
import { NewDocumentModal } from '@/features/documents/components/NewDocumentModal';
import { useDocuments } from '@/features/documents/hooks/useDocuments';
import { DocumentStatus } from '@/features/documents/types/document.types';
import { Pagination } from '@/features/templates/components/Pagination';
import { useDebounce } from '@/hooks/useDebounce';

export default function DocumentsPage() {
  const [searchInput, setSearchInput] = useState('');
  const [status, setStatus] = useState<DocumentStatus | ''>('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 300);

  const { data, isLoading, isFetching } = useDocuments({
    search: debouncedSearch || undefined,
    status: status || undefined,
    page,
    limit: 10,
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all your content drafts and published work.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New document
        </Button>
      </div>

      <DocumentFilters
        search={searchInput}
        status={status}
        onSearchChange={(v) => {
          setSearchInput(v);
          setPage(1);
        }}
        onStatusChange={(v) => {
          setStatus(v);
          setPage(1);
        }}
      />

      <DocumentList
        documents={data?.items ?? []}
        isLoading={isLoading || isFetching}
        emptyMessage={
          debouncedSearch || status
            ? 'No documents match your filters.'
            : 'No documents yet. Create your first one!'
        }
      />

      {data && (
        <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
      )}

      <NewDocumentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
