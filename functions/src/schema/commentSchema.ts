import { Timestamp } from 'firebase-admin/firestore';
import { z } from 'zod';
import { imageSchema } from './imageSchema';

export const commentSchema = z
  .object({
    orderId: z.string(),
    productId: z.string(),
    productNameZH: z.string(),
    productNameEN: z.string(),
    productDescriptionZH: z.string().optional(),
    productDescriptionEN: z.string().optional(),
    productImage: imageSchema.optional(),
    boughtQuantity: z.number().nonnegative(),
    userId: z.string(),
    userFirstName: z.string().optional(),
    userLastName: z.string().optional(),
    userEmail: z.string().email().optional(),
    userAvatar: imageSchema.optional(),
    userRole: z.union([z.literal('anonymous'), z.literal('user'), z.literal('admin')]),
    title: z.string(),
    content: z.string(),
    images: z.array(imageSchema),
    rating: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
    published: z.boolean(),
    createdAt: z.instanceof(Timestamp),
    updatedAt: z.instanceof(Timestamp),
    deletedAt: z.instanceof(Timestamp).optional(),
  })
  .passthrough();
