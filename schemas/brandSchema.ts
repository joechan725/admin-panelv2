import { z } from 'zod';

export const brandSchema = z.object({
  nameZH: z.string().min(1, 'required'),
  nameEN: z.string().min(1, 'required'),
});

export type BrandSchema = z.infer<typeof brandSchema>;
