'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { documentsService } from '@/features/documents/services/documents.service';
import { CreateDocumentInput, UpdateDocumentInput } from '@/features/documents/types/document.types';

export const useDocument = (id: string | undefined) => {
  return useQuery({
    queryKey: ['document', id],
    queryFn: () => documentsService.getDocument(id!),
    enabled: !!id,
    select: (response) => response.data,
  });
};

export const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDocumentInput }) =>
      documentsService.updateDocument(id, data),
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({ queryKey: ['document', variables.id] });
    },
  });
};

export const useCreateDocument = () => {
  return useMutation({
    mutationFn: (data: CreateDocumentInput) => documentsService.createDocument(data),
  });
};
