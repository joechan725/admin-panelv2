import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z.string().min(1, 'required'),
  lastName: z.string().optional(),
  gender: z.union([z.literal('Men'), z.literal('Women'), z.literal('NotWilling')]),
  phoneNumber: z.string().min(8, 'phoneNumber8Digit').max(8, 'phoneNumber8Digit').or(z.literal('')),
  dateOfBirth: z.coerce.date().or(z.literal('')),
  subscribeToPromotion: z.coerce.boolean(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
