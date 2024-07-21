import { z } from 'zod';

export const orderRefundSchema = z.object({
  refundAmount: z.coerce
    .number()
    .min(0.01, 'required')
    .nonnegative('shallNotBeNegative')
    .multipleOf(0.01, 'tooManyDecimalPlace')
    .or(z.literal('all')),
  message: z.string().optional(),
  referenceUrl: z.string().url().or(z.literal('')),
  referenceNumber: z.string().optional(),
});

export type OrderRefundSchema = z.infer<typeof orderRefundSchema>;
