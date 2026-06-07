'use client';

import React, { useState } from 'react';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminReviews } from '@/features/admin/hooks/useAdminData';
import { ReviewModerationTable } from '@/features/admin/components/ReviewModerationTable';

export default function AdminReviewsPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useAdminReviews({ page, limit: 10 });
  const meta    = data?.meta;
  const reviews = data?.data ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Review Moderation</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Approve or reject pending template reviews.
        </p>
      </div>

      {/* Badge: pending count */}
      {meta && (
        <div className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
          {meta.total} pending review{meta.total !== 1 ? 's' : ''} awaiting moderation
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          Failed to load reviews.
        </div>
      ) : (
        <ReviewModerationTable reviews={reviews} />
      )}

      {/* Pagination */}
      {meta && meta.totalPage > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Page {meta.page} of {meta.totalPage}
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
