import React from 'react';

export function TemplateCardSkeleton() {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-card/60 p-0 shadow-sm animate-pulse">
      {/* Thumbnail area skeleton */}
      <div className="h-32 w-full bg-muted/65 relative">
        <div className="absolute bottom-3 left-3 h-5 w-20 rounded bg-muted/95" />
      </div>

      {/* Details Area */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <div className="h-5 w-3/4 rounded bg-muted/80" />

        {/* Short description text lines */}
        <div className="mt-3 space-y-2">
          <div className="h-4 w-full rounded bg-muted/65" />
          <div className="h-4 w-5/6 rounded bg-muted/65" />
        </div>

        {/* Footer Metrics Row */}
        <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
          {/* Star rating */}
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded-full bg-muted/85" />
            <div className="h-3.5 w-6 rounded bg-muted/85" />
          </div>

          {/* Usage count */}
          <div className="h-3.5 w-12 rounded bg-muted/80" />

          {/* Author info */}
          <div className="h-3.5 w-16 rounded bg-muted/80" />
        </div>
      </div>
    </div>
  );
}
export default TemplateCardSkeleton;
