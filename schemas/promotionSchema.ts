import { z } from 'zod';

export const promotionSchema = z
  .object({
    promoteByEmail: z.coerce.boolean(),
    promoteByNotification: z.coerce.boolean(),
    toSubscribers: z.coerce.boolean(),
    additionalBcc: z.array(z.string().email().min(1, 'required')),
    subject: z.string().min(1, 'required'),
    htmlContent: z.string().min(1, 'required'),
  })
  .refine(({ promoteByEmail, promoteByNotification }) => promoteByEmail || promoteByNotification, {
    path: ['root'],
    message: 'noPromotionMethodSelected',
  });

export type PromotionSchema = z.infer<typeof promotionSchema>;
