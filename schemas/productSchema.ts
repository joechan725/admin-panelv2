import { z } from 'zod';

export const productSchema = z
  .object({
    nameZH: z.string().trim().min(1, 'required'),
    nameEN: z.string().trim().min(1, 'required'),
    descriptionZH: z.string().optional(),
    descriptionEN: z.string().optional(),
    markedPrice: z.coerce
      .number()
      .min(0.01, 'required')
      .nonnegative('shallNotBeNegative')
      .multipleOf(0.01, 'tooManyDecimalPlace'),
    sellingPrice: z.coerce
      .number()
      .nonnegative('shallNotBeNegative')
      .multipleOf(0.01, 'tooManyDecimalPlace')
      .transform((value) => (value === 0 ? undefined : value)),
    stock: z.coerce.number().min(1, 'required').nonnegative('shallNotBeNegative').int('shallBeAnInteger'),
    collectionId: z.string().optional(),
    brandId: z.string().optional(),
    categoryId: z.string().optional(),
    detailZH: z.string().optional(),
    detailEN: z.string().optional(),
    tags: z.array(z.string().min(1, 'eachTagMustBeAtLeastOneCharacterLong')),
    isPublic: z.coerce.boolean(),
  })
  .refine(({ markedPrice, sellingPrice }) => (sellingPrice ? markedPrice > sellingPrice : true), {
    path: ['sellingPrice'],
    message: 'discountedPriceShouldNotBeLargerThanBasicPrice',
  });

export type ProductSchema = z.infer<typeof productSchema>;
