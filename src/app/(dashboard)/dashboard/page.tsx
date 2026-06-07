'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UsageStatsCards } from '@/features/analytics/components/UsageStatsCards';
import { AiLogsTable } from '@/features/analytics/components/AiLogsTable';
import { DocumentList } from '@/features/documents/components/DocumentList';
import { NewDocumentModal } from '@/features/documents/components/NewDocumentModal';
import { useDocuments } from '@/features/documents/hooks/useDocuments';
import { useAppSelector } from '@/store';

export default function DashboardPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading } = useDocuments({ page: 1, limit: 5 });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back{user?.name ? `, ${user.name}` : ''}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your workspace overview and recent activity.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New document
        </Button>
      </div>

      <UsageStatsCards />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent documents</h2>
          <Link
            href="/documents"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <DocumentList
          documents={data?.items ?? []}
          isLoading={isLoading}
          emptyMessage="No documents yet. Create your first one!"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Recent AI activity</h2>
        <AiLogsTable />
      </section>

      <NewDocumentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
