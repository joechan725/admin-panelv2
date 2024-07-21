import { z } from 'zod';

export const couponSchema = z
  .object({
    code: z.string().min(1, 'required').min(4, 'minimum4CharactersRequired'),
    discountType: z.union([z.literal('fixed'), z.literal('percentage')]),
    discountAmount: z.coerce
      .number()
      .min(0.01, 'required')
      .multipleOf(0.01, 'tooManyDecimalPlace')
      .nonnegative('shallNotBeNegative'),
    maximumDiscount: z.coerce
      .number()
      .multipleOf(0.01, 'tooManyDecimalPlace')
      .nonnegative('shallNotBeNegative')
      .transform((value) => (value === 0 ? undefined : value)),
    minimumSpend: z.coerce
      .number()
      .multipleOf(0.01, 'tooManyDecimalPlace')
      .nonnegative('shallNotBeNegative')
      .transform((value) => (value === 0 ? undefined : value)),
    usageLimit: z.coerce
      .number()
      .int()
      .nonnegative('shallNotBeNegative')
      .transform((value) => (value === 0 ? undefined : value)),
    usageLimitPerUser: z.coerce
      .number()
      .int()
      .nonnegative('shallNotBeNegative')
      .transform((value) => (value === 0 ? undefined : value)),
    startDate: z.coerce.date().or(z.literal('')),
    endDate: z.coerce.date().or(z.literal('')),
    isPublic: z.coerce.boolean(),
    registeredUserOnly: z.coerce.boolean(),
    canBeUsedTogether: z.coerce.boolean(),
  })
  .refine(
    ({ startDate, endDate }) => {
      if (startDate && endDate) {
        return endDate.getTime() > startDate.getTime();
      }
      return true;
    },
    { path: ['endDate'], message: 'theEndTimeIsEarlierThanTheStartTime' }
  )
  .refine(
    ({ discountType, discountAmount }) => {
      if (discountType === 'percentage') {
        return discountAmount <= 100;
      }
      return true;
    },
    {
      path: ['discountAmount'],
      message: 'percentageDiscountTypeLessThan100',
    }
  );

export type CouponSchema = z.infer<typeof couponSchema>;
