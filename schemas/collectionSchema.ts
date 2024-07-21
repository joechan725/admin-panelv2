import { z } from 'zod';

export const collectionSchema = z.object({
  nameZH: z.string().min(1, 'required'),
  nameEN: z.string().min(1, 'required'),
});

export type CollectionSchema = z.infer<typeof collectionSchema>;
