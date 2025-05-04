import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  price: z.number().min(0),
});

export type ProductDTO = z.infer<typeof ProductSchema>;
