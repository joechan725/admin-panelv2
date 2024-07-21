import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().trim().min(1, 'required').min(6, 'minimum6CharactersRequired'),
    newPassword: z.string().trim().min(1, 'required').min(6, 'minimum6CharactersRequired'),
    confirmPassword: z.string().trim().min(1, 'required').min(6, 'minimum6CharactersRequired'),
  })
  .refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
    path: ['confirmPassword'],
    message: 'passwordNotMatch',
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
