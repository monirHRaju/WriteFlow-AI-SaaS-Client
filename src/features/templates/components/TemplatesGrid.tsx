'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Template } from '../services/templates.service';
import { TemplateCard } from './TemplateCard';
import { TemplateCardSkeleton } from './TemplateCardSkeleton';

interface TemplatesGridProps {
  templates: Template[] | undefined;
  isLoading: boolean;
  onResetFilters?: () => void;
}

export function TemplatesGrid({ templates, isLoading, onResetFilters }: TemplatesGridProps) {
  // If loading, show 6 skeleton cards
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <TemplateCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // If no templates, show a premium empty state
  if (!templates || templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/25 p-12 text-center backdrop-blur-sm animate-fade-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/65 text-muted-foreground mb-4">
          <Search className="h-8 w-8 text-foreground/45" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-foreground">No templates found</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          We couldn&apos;t find any templates matching your search criteria. Try adjusting your query or filters.
        </p>
        {onResetFilters && (
          <Button
            onClick={onResetFilters}
            variant="outline"
            className="mt-6 border-border hover:bg-muted/80"
          >
            Clear all filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
}
export default TemplatesGrid;
