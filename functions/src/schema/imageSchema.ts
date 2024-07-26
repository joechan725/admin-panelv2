import { z } from 'zod';

export const imageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  alt: z.string(),
});
