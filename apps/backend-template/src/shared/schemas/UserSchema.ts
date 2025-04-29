import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1)
});

export type UserDTO = z.infer<typeof UserSchema>;
