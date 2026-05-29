import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string({ required_error: 'Name is required.' })
    .min(2, 'Name must be at least 2 characters long.'),
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Invalid email address format.'),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(6, 'Password must be at least 6 characters long.'),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Invalid email address format.'),
  password: z.string({ required_error: 'Password is required.' }).min(1, 'Password is required.'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
