'use client';

import React from 'react';
import { CheckCircle, XCircle, Loader2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminReview } from '../types/admin.types';
import { useUpdateReview } from '../hooks/useAdminData';

type Props = {
  reviews: AdminReview[];
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: 'short',
    day:   'numeric',
    year:  'numeric',
  });
}

export function ReviewModerationTable({ reviews }: Props) {
  const mutation = useUpdateReview();

  if (!reviews.length) {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <CheckCircle className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">No pending reviews. All caught up!</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted/30 border-b border-border">
          <tr>
            {['Reviewer', 'Template', 'Rating', 'Comment', 'Date', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => {
            const isPending =
              mutation.isPending && (mutation.variables as any)?.id === review.id;

            return (
              <tr key={review.id} className="border-b border-border last:border-0 hover:bg-accent/20 transition-colors">
                {/* Reviewer */}
                <td className="px-4 py-3">
                  <p className="font-medium">{review.user.name}</p>
                  <p className="text-xs text-muted-foreground">{review.user.email}</p>
                </td>

                {/* Template */}
                <td className="px-4 py-3">
                  <p className="font-medium">{review.template.title}</p>
                  <p className="text-xs text-muted-foreground">{review.template.category}</p>
                </td>

                {/* Rating */}
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    {review.rating}/5
                  </span>
                </td>

                {/* Comment */}
                <td className="px-4 py-3 max-w-xs">
                  <p className="text-muted-foreground text-xs line-clamp-2">{review.comment}</p>
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                  {formatDate(review.createdAt)}
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isPending}
                      onClick={() => mutation.mutate({ id: review.id, data: { status: 'APPROVED' } })}
                      className="text-xs h-7 border-emerald-400/40 text-emerald-400 hover:bg-emerald-400/10"
                    >
                      {isPending ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <><CheckCircle className="h-3 w-3 mr-1" />Approve</>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isPending}
                      onClick={() => mutation.mutate({ id: review.id, data: { status: 'REJECTED' } })}
                      className="text-xs h-7 border-red-400/40 text-red-400 hover:bg-red-400/10"
                    >
                      {isPending ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <><XCircle className="h-3 w-3 mr-1" />Reject</>
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
