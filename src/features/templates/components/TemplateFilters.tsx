'use client';

import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TemplateFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'writing', label: 'Writing' },
  { value: 'development', label: 'Development' },
  { value: 'seo', label: 'SEO' },
  { value: 'business', label: 'Business' },
];

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Top Rated' },
];

export function TemplateFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: TemplateFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/85 bg-card/45 p-4 md:flex-row md:items-center md:justify-between md:p-5 backdrop-blur-sm shadow-sm">
      {/* Search Input field */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground/80" />
        <Input
          type="text"
          placeholder="Search templates by title or description..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background/50 border-border/70 focus-visible:ring-1 focus-visible:ring-primary/45 w-full text-sm placeholder-muted-foreground/60"
        />
      </div>

      {/* Select Dropdowns */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Category Dropdown */}
        <div className="relative flex items-center">
          <Filter className="absolute left-3 h-4 w-4 text-muted-foreground/80 pointer-events-none" />
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-10 pl-9 pr-8 rounded-md border border-border/70 bg-background/50 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45 focus:border-primary/40 cursor-pointer appearance-none min-w-[160px]"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value} className="bg-card">
                {cat.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none text-muted-foreground/85">
            <span className="text-[10px]">&#9660;</span>
          </div>
        </div>

        {/* Sort Select */}
        <div className="relative flex items-center">
          <ArrowUpDown className="absolute left-3 h-4 w-4 text-muted-foreground/80 pointer-events-none" />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="h-10 pl-9 pr-8 rounded-md border border-border/70 bg-background/50 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45 focus:border-primary/40 cursor-pointer appearance-none min-w-[160px]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-card">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none text-muted-foreground/85">
            <span className="text-[10px]">&#9660;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TemplateFilters;
