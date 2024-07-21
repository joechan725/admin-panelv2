import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().trim().min(1, 'required').email('invalidEmailAddress'),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
