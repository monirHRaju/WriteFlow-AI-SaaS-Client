'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { useTemplates } from '@/features/templates/hooks/useTemplates';
import { TemplateFilters } from '@/features/templates/components/TemplateFilters';
import { TemplatesGrid } from '@/features/templates/components/TemplatesGrid';
import { Pagination } from '@/features/templates/components/Pagination';
import { useDebounce } from '@/hooks/useDebounce';

function ExploreContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Extract query params from URL
  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || '';
  const urlSort = searchParams.get('sort') || 'popular';
  const urlPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10));

  // 2. Controlled search query input local state
  const [searchInput, setSearchInput] = React.useState(urlSearch);

  // Sync local search state with URL if changed externally (e.g. clearing filters)
  React.useEffect(() => {
    setSearchInput(urlSearch);
  }, [urlSearch]);

  // 3. Debounce input changes by 300ms
  const debouncedSearch = useDebounce(searchInput, 300);

  // 4. URL query params helper
  const updateQueryParams = React.useCallback(
    (newParams: Record<string, string | number | undefined | null>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          current.delete(key);
        } else {
          current.set(key, String(value));
        }
      });

      const searchStr = current.toString();
      const query = searchStr ? `?${searchStr}` : '';
      router.push(`${pathname}${query}`);
    },
    [router, pathname, searchParams]
  );

  // Sync debounced search to searchParams (and reset page to 1)
  React.useEffect(() => {
    if (debouncedSearch !== urlSearch) {
      updateQueryParams({ search: debouncedSearch, page: 1 });
    }
  }, [debouncedSearch, urlSearch, updateQueryParams]);

  // 5. Query templates via custom hook
  const { data, isLoading, isError, error } = useTemplates({
    search: urlSearch,
    category: urlCategory,
    sort: urlSort,
    page: urlPage,
    limit: 9, // 9 items per page (nice 3x3 layout)
  });

  const handleCategoryChange = (categoryVal: string) => {
    updateQueryParams({ category: categoryVal, page: 1 });
  };

  const handleSortChange = (sortVal: string) => {
    updateQueryParams({ sort: sortVal, page: 1 });
  };

  const handlePageChange = (pageVal: number) => {
    updateQueryParams({ page: pageVal });
  };

  const handleResetFilters = () => {
    setSearchInput('');
    router.push(pathname); // Clears all search criteria
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Decorative Blur Backdrops */}
      <div className="absolute left-1/4 top-1/6 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl relative z-10">
        {/* Page Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/95 to-muted-foreground/90">
            Explore Templates
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Select a specialized AI template tailored for content writing, SEO marketing, and business planning to accelerate your workflow.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="mb-8">
          <TemplateFilters
            search={searchInput}
            onSearchChange={setSearchInput}
            category={urlCategory}
            onCategoryChange={handleCategoryChange}
            sort={urlSort}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Error State Display */}
        {isError && (
          <div className="rounded-xl border border-destructive/25 bg-destructive/10 p-6 text-center text-destructive mb-8">
            <p className="font-semibold text-sm">Failed to retrieve templates</p>
            <p className="text-xs text-muted-foreground/80 mt-1">
              {(error as Error)?.message || 'Unknown network error occurred.'}
            </p>
          </div>
        )}

        {/* Templates Grid List */}
        {!isError && (
          <TemplatesGrid
            templates={data?.data.items}
            isLoading={isLoading}
            onResetFilters={handleResetFilters}
          />
        )}

        {/* Pagination Row */}
        {!isError && data && (
          <Pagination
            page={urlPage}
            totalPages={data.data.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
}

export default function ExplorePage() {
  return (
    <ProtectedRoute>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
            <p className="text-sm text-muted-foreground animate-pulse">
              Loading explore space...
            </p>
          </div>
        }
      >
        <ExploreContent />
      </Suspense>
    </ProtectedRoute>
  );
}
