'use client';

import { useQuery } from '@tanstack/react-query';
import { documentsService } from '@/features/documents/services/documents.service';

export const useDocument = (id: string | undefined) => {
  return useQuery({
    queryKey: ['document', id],
    queryFn: () => documentsService.getDocument(id!),
    enabled: !!id,
    select: (response) => response.data,
  });
};
