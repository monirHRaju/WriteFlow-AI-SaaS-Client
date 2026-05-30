import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { templatesService, GetTemplatesParams } from '../services/templates.service';

/**
 * React Query hook to fetch templates list with search, filter, sorting, and pagination.
 * Leverages React Query v5's placeholderData: keepPreviousData to keep previous pages
 * loaded on screen while fetching the next pages.
 * @param params Filters, page, and sorting configurations
 */
export function useTemplates(params: GetTemplatesParams) {
  return useQuery({
    queryKey: ['templates', params],
    queryFn: () => templatesService.getTemplates(params),
    placeholderData: keepPreviousData,
    staleTime: 10000, // Optional: keeps data fresh for 10 seconds before polling
  });
}
export default useTemplates;
