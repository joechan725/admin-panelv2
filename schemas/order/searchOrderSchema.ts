import { z } from 'zod';

export const searchOrderSchema = z.object({
  orderId: z.string().min(1, 'pleaseEnterOrderId'),
  queryCode: z.string().min(6, 'minimum6CharactersRequired').max(6, 'minimum6CharactersRequired').or(z.literal('')),
});

export type SearchOrderSchema = z.infer<typeof searchOrderSchema>;
