import { z } from 'zod';

export const stockSubscriptionSchema = z.object({
  email: z.string().email().min(1, 'required'),
});

export type StockSubscriptionSchema = z.infer<typeof stockSubscriptionSchema>;
