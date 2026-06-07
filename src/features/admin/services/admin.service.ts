import axiosInstance from "@/lib/axios";
import {
  AdminAnalytics,
  AdminUser,
  AdminReview,
  PaginatedResponse,
  UpdateRoleInput,
  UpdateStatusInput,
  UpdateReviewInput,
  GetUsersParams,
} from "../types/admin.types";
import { ApiResponse } from "@/features/auth/types/auth.types";

export const adminService = {
  // Analytics
  getAnalytics: async (): Promise<ApiResponse<AdminAnalytics>> => {
    const res =
      await axiosInstance.get<ApiResponse<AdminAnalytics>>("/admin/analytics");
    return res.data;
  },

  // Users
  getUsers: async (
    params: GetUsersParams,
  ): Promise<PaginatedResponse<AdminUser>> => {
    const res = await axiosInstance.get<PaginatedResponse<AdminUser>>(
      "/admin/users",
      { params },
    );
    return res.data;
  },

  updateUserRole: async (
    id: string,
    data: UpdateRoleInput,
  ): Promise<ApiResponse<AdminUser>> => {
    const res = await axiosInstance.patch<ApiResponse<AdminUser>>(
      `/admin/users/${id}/role`,
      data,
    );
    return res.data;
  },

  updateUserStatus: async (
    id: string,
    data: UpdateStatusInput,
  ): Promise<ApiResponse<AdminUser>> => {
    const res = await axiosInstance.patch<ApiResponse<AdminUser>>(
      `/admin/users/${id}/status`,
      data,
    );
    return res.data;
  },

  // Reviews
  getReviews: async (params: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<AdminReview>> => {
    const res = await axiosInstance.get<PaginatedResponse<AdminReview>>(
      "/admin/reviews",
      { params },
    );
    return res.data;
  },

  updateReview: async (
    id: string,
    data: UpdateReviewInput,
  ): Promise<ApiResponse<AdminReview>> => {
    const res = await axiosInstance.patch<ApiResponse<AdminReview>>(
      `/admin/reviews/${id}`,
      data,
    );
    return res.data;
  },
};
