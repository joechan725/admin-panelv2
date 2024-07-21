import { z } from 'zod';

export const orderPlacementSchema = z
  .object({
    couponCodes: z.array(z.string().min(1, 'eachCodeMustBeAtLeastOneCharacterLong')),
    isPickUp: z.coerce.boolean(),
    // delivery address
    deliveryAddressId: z.string().optional(),
    deliveryRegion: z.union([z.literal('Hong Kong Island'), z.literal('Kowloon'), z.literal('New Territories')]),
    deliveryDistrict: z.union([
      z.literal('Central and Western District'),
      z.literal('Eastern District'),
      z.literal('Southern District'),
      z.literal('Wan Chai District'),
      z.literal('Kowloon City District'),
      z.literal('Kwun Tong District'),
      z.literal('Sham Shui Po District'),
      z.literal('Wong Tai Sin District'),
      z.literal('Yau Tsim Mong District'),
      z.literal('Islands District'),
      z.literal('Kwai Tsing District'),
      z.literal('North District'),
      z.literal('Sai Kung District'),
      z.literal('Sha Tin District'),
      z.literal('Tai Po District'),
      z.literal('Tsuen Wan District'),
      z.literal('Tuen Mun District'),
      z.literal('Yuen Long District'),
    ]),
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
