import { z } from 'zod';

export const applyRefundSchema = z
  .object({
    refundReason: z.string(),
  })
  .passthrough();

export type ApplyRefundSchema = z.infer<typeof applyRefundSchema>;
