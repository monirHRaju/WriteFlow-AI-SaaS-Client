import axiosInstance from '@/lib/axios';

export interface GetTemplatesParams {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface Template {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  prompt: string;
  sampleOutput?: string | null;
  thumbnail?: string | null;
  rating: number;
  usageCount: number;
  isPublished: boolean;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: {
    id: string;
    name: string;
    avatar?: string | null;
  };
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const templatesService = {
  /**
   * Fetch paginated list of templates with optional filter/sort criteria.
   * Path resolves to: GET /api/v1/templates
   * @param params Query parameters
   */
  getTemplates: async (params: GetTemplatesParams): Promise<PaginatedResponse<Template>> => {
    const response = await axiosInstance.get<PaginatedResponse<Template>>('/templates', {
      params,
    });
    return response.data;
  },

  /**
   * Fetch a single template by its slug.
   * Path resolves to: GET /api/v1/templates/:slug
   * @param slug Template slug
   */
  getTemplateBySlug: async (slug: string): Promise<{ success: boolean; data: Template }> => {
    const response = await axiosInstance.get<{ success: boolean; data: Template }>(
      `/templates/${slug}`
    );
    return response.data;
  },

  /**
   * Trigger template usage increment.
   * Path resolves to: POST /api/v1/templates/:id/use
   * @param id Template database ID
   */
  useTemplate: async (id: string): Promise<{ success: boolean; data: Template }> => {
    const response = await axiosInstance.post<{ success: boolean; data: Template }>(
      `/templates/${id}/use`
    );
    return response.data;
  },
};
export default templatesService;
