'use client';

import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { documentsService } from '@/features/documents/services/documents.service';
import {
  CreateDocumentInput,
  GetDocumentsParams,
  UpdateDocumentInput,
} from '@/features/documents/types/document.types';

export const useDocuments = (params: GetDocumentsParams = {}) => {
  return useQuery({
    queryKey: ['documents', params],
    queryFn: () => documentsService.getDocuments(params),
    placeholderData: keepPreviousData,
    select: (response) => response.data,
  });
};

export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDocumentInput) => documentsService.createDocument(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['user-stats'] });
    },
  });
};

export const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDocumentInput }) =>
      documentsService.updateDocument(id, data),
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['document', variables.id] });
    },
  });
};

export const useArchiveDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => documentsService.archiveDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['user-stats'] });
    },
  });
};
