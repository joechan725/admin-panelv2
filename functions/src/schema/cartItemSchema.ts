import { z } from 'zod';
import { imageSchema } from './imageSchema';
import { Timestamp } from 'firebase-admin/firestore';

export const cartItemSchema = z
  .object({
    // Product details
    productId: z.string(),
    nameZH: z.string(),
    nameEN: z.string(),
    descriptionZH: z.string().optional(),
    descriptionEN: z.string().optional(),
    image: imageSchema.optional(),
    sellingPrice: z.number().optional(),
    markedPrice: z.number(),
    stock: z.number(),
    collectionId: z.string().optional(),
    collectionNameZH: z.string().optional(),
    collectionNameEN: z.string().optional(),
    brandId: z.string().optional(),
    brandNameZH: z.string().optional(),
    brandNameEN: z.string().optional(),
    categoryId: z.string().optional(),
    categoryNameZH: z.string().optional(),
    categoryNameEN: z.string().optional(),
    commentCount: z.number().optional(),
    rating: z.number().optional(),

    // Quantity
    quantity: z.number(),

    // Timestamps
    createdAt: z.instanceof(Timestamp),
    updatedAt: z.instanceof(Timestamp),

    // Error message
    errorMessage: z
      .union([z.literal('no longer available'), z.literal('out of stock'), z.literal('not enough stock')])
      .optional(),
  })
  .passthrough();
