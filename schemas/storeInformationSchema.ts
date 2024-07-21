import { z } from 'zod';

export const storeInformationSchema = z.object({
  // social media
  facebookURL: z.string().url().optional().or(z.literal('')),
  instagramURL: z.string().url().optional().or(z.literal('')),
  youtubeURL: z.string().url().optional().or(z.literal('')),
  twitterURL: z.string().url().optional().or(z.literal('')),
  whatsappNumber: z.string().min(8, 'phoneNumber8Digit').max(8, 'phoneNumber8Digit').optional().or(z.literal('')),
  phone: z.string().min(8, 'phoneNumber8Digit').max(8, 'phoneNumber8Digit').optional().or(z.literal('')),
  email: z.string().email(),
});

export type StoreInformationSchema = z.infer<typeof storeInformationSchema>;
