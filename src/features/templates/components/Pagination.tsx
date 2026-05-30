'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate range of page numbers to display with smart ellipsis
  const getPageNumbers = () => {
    const delta = 1; // Number of pages to show before and after current page
    const range = [];
    const rangeWithDots = [];
    let l;

    range.push(1);

    for (let i = page - delta; i <= page + delta; i++) {
      if (i < totalPages && i > 1) {
        range.push(i);
      }
    }

    if (totalPages > 1) {
      range.push(totalPages);
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-2 border-t border-border/40 pt-6">
      {/* Prev page button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="h-9 w-9 border-border bg-card/50 text-foreground hover:bg-muted"
        aria-label="Previous Page"
      >
        <ChevronLeft className="h-4.5 w-4.5" />
      </Button>

      {/* Pages list */}
      <div className="flex items-center gap-1.5">
        {getPageNumbers().map((pageNum, idx) => {
          if (pageNum === '...') {
            return (
              <span
                key={`dots-${idx}`}
                className="px-2 text-sm text-muted-foreground/60 select-none"
              >
                ...
              </span>
            );
          }

          const isActive = pageNum === page;
          return (
            <Button
              key={`page-${pageNum}`}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(pageNum as number)}
              className={`h-9 w-9 text-xs font-semibold ${
                isActive
                  ? 'bg-foreground text-background hover:bg-foreground/90 shadow'
                  : 'border-border bg-card/50 text-foreground hover:bg-muted'
              }`}
            >
              {pageNum}
            </Button>
          );
        })}
      </div>

      {/* Next page button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="h-9 w-9 border-border bg-card/50 text-foreground hover:bg-muted"
        aria-label="Next Page"
      >
        <ChevronRight className="h-4.5 w-4.5" />
      </Button>
    </div>
  );
}
export default Pagination;
