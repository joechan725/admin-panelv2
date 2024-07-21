import { z } from 'zod';

export const applyRefundSchema = z.object({
  refundReason: z.string().min(1, 'required').max(200, 'maximum200CharactersAllowed'),
});

export type ApplyRefundSchema = z.infer<typeof applyRefundSchema>;
