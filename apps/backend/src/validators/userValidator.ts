import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Valid email required').optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
