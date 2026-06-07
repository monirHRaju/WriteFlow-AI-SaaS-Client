"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { adminService } from "../services/admin.service";
import {
  GetUsersParams,
  UpdateReviewInput,
  UpdateRoleInput,
  UpdateStatusInput,
} from "../types/admin.types";

// ─── Analytics ───────────────────────────────────────────────────────────────

export const useAdminAnalytics = () =>
  useQuery({
    queryKey: ["admin-analytics"],
    queryFn: () => adminService.getAnalytics(),
    select: (res) => res.data,
  });

// ─── Users ────────────────────────────────────────────────────────────────────

export const useAdminUsers = (params: GetUsersParams) =>
  useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => adminService.getUsers(params),
    placeholderData: keepPreviousData,
  });

export const useUpdateUserRole = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRoleInput }) =>
      adminService.updateUserRole(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  });
};

export const useUpdateUserStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStatusInput }) =>
      adminService.updateUserStatus(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  });
};

// ─── Reviews ─────────────────────────────────────────────────────────────────

export const useAdminReviews = (params: { page?: number; limit?: number }) =>
  useQuery({
    queryKey: ["admin-reviews", params],
    queryFn: () => adminService.getReviews(params),
    placeholderData: keepPreviousData,
  });

export const useUpdateReview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReviewInput }) =>
      adminService.updateReview(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-reviews"] }),
  });
};
