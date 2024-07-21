import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'required').email('invalidEmailAddress'),
  password: z.string().trim().min(1, 'required').min(6, 'minimum6CharactersRequired'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
