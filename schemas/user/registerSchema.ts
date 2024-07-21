import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().trim().min(1, 'required').email('invalidEmailAddress'),
    password: z.string().trim().min(1, 'required').min(6, 'minimum6CharactersRequired'),
    confirmPassword: z.string().trim().min(1, 'required').min(6, 'minimum6CharactersRequired'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
    message: 'passwordNotMatch',
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
