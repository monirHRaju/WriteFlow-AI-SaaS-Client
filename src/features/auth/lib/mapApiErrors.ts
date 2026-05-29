import { AxiosError } from 'axios';
import { ApiErrorResponse } from '@/features/auth/types/auth.types';

export const mapApiErrors = (error: unknown): Record<string, string> => {
  const fieldErrors: Record<string, string> = {};

  if (!(error instanceof AxiosError)) {
    return { root: 'Something went wrong. Please try again.' };
  }

  const data = error.response?.data as ApiErrorResponse | undefined;

  if (data?.errors?.length) {
    for (const err of data.errors) {
      const key = err.path && err.path.length > 0 ? String(err.path) : 'root';
      if (!fieldErrors[key]) {
        fieldErrors[key] = err.message;
      }
    }
    return fieldErrors;
  }

  if (data?.message) {
    return { root: data.message };
  }

  return { root: 'Something went wrong. Please try again.' };
};

export const applyApiErrorsToForm = <T extends string>(
  errors: Record<string, string>,
  setError: (name: T, error: { message: string }) => void
): void => {
  for (const [field, message] of Object.entries(errors)) {
    if (field === 'root') continue;
    setError(field as T, { message });
  }
};
