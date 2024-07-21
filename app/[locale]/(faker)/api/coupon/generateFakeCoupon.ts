import { fakerZH_TW as faker } from '@faker-js/faker';
import { Coupon } from '@/models/coupon/Coupon';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';

interface CouponData extends Omit<Coupon, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'startDate' | 'endDate'> {
  startDate?: Date;
  endDate?: Date;
  createdAt: FieldValue;
  updatedAt: FieldValue;
  deletedAt?: FieldValue;
}

export const generateFakeCoupon = (): CouponData =>
  removeEmptyFieldFormObject({
    code: faker.string.alphanumeric({ length: { min: 6, max: 12 } }).toUpperCase(),
    description: faker.commerce.productDescription(),
    discountType: faker.datatype.boolean() ? 'fixed' : 'percentage',
    discountAmount: faker.number.int({ min: 5, max: 50 }),
    maximumDiscount: faker.datatype.boolean() ? faker.number.int({ min: 50, max: 200 }) : undefined,
    minimumSpend: faker.datatype.boolean() ? faker.number.int({ min: 20, max: 100 }) : undefined,
    startDate: faker.datatype.boolean()
      ? new Date(Date.now() - faker.number.int({ min: 0, max: 7 * 24 * 60 * 60 * 1000 }))
      : undefined, // Random start date within the past week
    endDate: faker.datatype.boolean()
      ? new Date(Date.now() + faker.number.int({ min: 7 * 24 * 60 * 60 * 1000, max: 30 * 24 * 60 * 60 * 1000 }))
      : undefined, // Random end date within the next month
    usageLimit: faker.number.int({ min: 1, max: 100 }),
    usageLimitPerUser: faker.datatype.boolean() ? faker.number.int({ min: 1, max: 10 }) : undefined,
    registeredUserOnly: faker.datatype.boolean(),
    isPublic: faker.datatype.boolean(),
    canBeUsedTogether: faker.datatype.boolean(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
