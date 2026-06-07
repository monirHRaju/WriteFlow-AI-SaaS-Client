'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usersService } from '@/features/analytics/services/analytics.service';
import { analyticsService } from '@/features/analytics/services/analytics.service';
import { useAppDispatch, useAppSelector } from '@/store';
import { setCredentials } from '@/store/authSlice';
import { UpdateProfileInput } from '@/features/documents/types/document.types';

export const useUserStats = () => {
  return useQuery({
    queryKey: ['user-stats'],
    queryFn: () => usersService.getMyStats(),
    select: (response) => response.data,
  });
};

export const useAiLogs = (limit = 10) => {
  return useQuery({
    queryKey: ['ai-logs', limit],
    queryFn: () => analyticsService.getAiLogs(limit),
    select: (response) => response.data,
  });
};

export const useUpdateProfile = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const token = useAppSelector((state) => state.auth.token);

  return useMutation({
    mutationFn: (data: UpdateProfileInput) => usersService.updateProfile(data),
    onSuccess: (response) => {
      dispatch(setCredentials({ user: response.data, token }));
      queryClient.invalidateQueries({ queryKey: ['user-stats'] });
    },
  });
};
