import { z } from 'zod';

export const categorySchema = z.object({
  nameZH: z.string().min(1, 'required'),
  nameEN: z.string().min(1, 'required'),
});

export type CategorySchema = z.infer<typeof categorySchema>;
