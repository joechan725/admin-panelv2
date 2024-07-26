import { z } from 'zod';
import { regionSchema } from '../regionSchema';
import { districtSchema } from '../districtSchema';

export const orderPlacementSchema = z
  .object({
    couponCodes: z.array(z.string().min(1, 'eachCodeMustBeAtLeastOneCharacterLong')),
    isPickUp: z.coerce.boolean(),
    // delivery address
    deliveryAddressId: z.string().optional(),
    deliveryRegion: regionSchema,
    deliveryDistrict: districtSchema,
    deliveryDetailAddress: z.string().min(1, 'required'),
    contactName: z.string().min(1, 'required'),
    contactPhoneNumber: z.string().min(8, 'phoneNumber8Digit').max(8, 'phoneNumber8Digit'),
    addressRemark: z.string().optional(),
    storeName: z.string().optional(),
    storePhoneNumber: z.string().optional(),
    storeBusinessHours: z.string().optional(),
    // delivery option
    deliveryOptionId: z.string().min(1, 'required'),
    deliveryOptionNameZH: z.string().min(1, 'required'),
    deliveryOptionNameEN: z.string().min(1, 'required'),
    deliveryOptionDescriptionZH: z.string(),
    deliveryOptionDescriptionEN: z.string(),
    deliveryOptionDeliveryCharge: z.coerce
      .number()
      .multipleOf(0.01, 'tooManyDecimalPlace')
      .nonnegative('shallNotBeNegative'),
    deliveryOptionDeliveryProviderZH: z.string(),
    deliveryOptionDeliveryProviderEN: z.string(),
    deliveryOptionEstimatedTimeZH: z.string(),
    deliveryOptionEstimatedTimeEN: z.string(),
    deliveryOptionFreeDeliveryThreshold: z.coerce
      .number()
      .multipleOf(0.01, 'tooManyDecimalPlace')
      .nonnegative('shallNotBeNegative')
      .transform((value) => (value === 0 ? undefined : value)),
  })
  .refine(
    ({ deliveryRegion, deliveryDistrict }) => {
      if (deliveryRegion === 'Hong Kong Island') {
        if (
          deliveryDistrict === 'Central and Western District' ||
          deliveryDistrict === 'Eastern District' ||
          deliveryDistrict === 'Southern District' ||
          deliveryDistrict === 'Wan Chai District'
        ) {
          return true;
        }
        return false;
      }
      if (deliveryRegion === 'Kowloon') {
        if (
          deliveryDistrict === 'Kowloon City District' ||
          deliveryDistrict === 'Kwun Tong District' ||
          deliveryDistrict === 'Sham Shui Po District' ||
          deliveryDistrict === 'Wong Tai Sin District' ||
          deliveryDistrict === 'Yau Tsim Mong District'
        ) {
          return true;
        }
        return false;
      }
      if (deliveryRegion === 'New Territories') {
        if (
          deliveryDistrict === 'Islands District' ||
          deliveryDistrict === 'Kwai Tsing District' ||
          deliveryDistrict === 'North District' ||
          deliveryDistrict === 'Sai Kung District' ||
          deliveryDistrict === 'Sha Tin District' ||
          deliveryDistrict === 'Tai Po District' ||
          deliveryDistrict === 'Tsuen Wan District' ||
          deliveryDistrict === 'Tuen Mun District' ||
          deliveryDistrict === 'Yuen Long District'
        ) {
          return true;
        }
        return false;
      }
      return true;
    },
    { path: ['deliveryRegion'], message: 'districtIsNotMatchTheRegion' }
  );

export type OrderPlacementSchema = z.infer<typeof orderPlacementSchema>;
