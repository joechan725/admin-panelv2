import { z } from 'zod';

export const deliveryOptionSchema = z
  .object({
    nameEN: z.string().min(1, 'required'),
    nameZH: z.string().min(1, 'required'),
    descriptionEN: z.string(),
    descriptionZH: z.string(),
    deliveryCharge: z.coerce.number().multipleOf(0.01, 'tooManyDecimalPlace').nonnegative('shallNotBeNegative'),
    deliveryProviderEN: z.string(),
    deliveryProviderZH: z.string(),
    estimatedTimeEN: z.string(),
    estimatedTimeZH: z.string(),
    freeDeliveryThreshold: z.coerce
      .number()
      .multipleOf(0.01, 'tooManyDecimalPlace')
      .nonnegative('shallNotBeNegative')
      .transform((value) => (value === 0 ? undefined : value)),
    isPickUp: z.coerce.boolean(),
    isPublic: z.coerce.boolean(),
    applyThresholdBeforeCoupons: z.coerce.boolean(),
    storeAddressId: z.string().or(z.undefined()),
    storeAddressRegion: z
      .union([z.literal('Hong Kong Island'), z.literal('Kowloon'), z.literal('New Territories')])
      .or(z.undefined()),
    storeAddressDistrict: z
      .union([
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
      ])
      .or(z.undefined()),
    storeAddressDetailAddress: z.string().or(z.undefined()),
    storeAddressPhoneNumber: z.string().or(z.undefined()),
    storeAddressName: z.string().or(z.undefined()),
    storeAddressBusinessHours: z.string().or(z.undefined()),
  })
  .refine(
    ({
      isPickUp,
      storeAddressDetailAddress,
      storeAddressDistrict,
      storeAddressId,
      storeAddressName,
      storeAddressPhoneNumber,
      storeAddressRegion,
    }) => {
      if (isPickUp) {
        if (
          !storeAddressDetailAddress ||
          !storeAddressDistrict ||
          !storeAddressId ||
          !storeAddressName ||
          !storeAddressPhoneNumber ||
          !storeAddressRegion
        ) {
          return false;
        }
      }
      return true;
    },
    { path: ['root'], message: 'pleaseSelectPickUpAddress' }
  )
  .refine(
    ({ storeAddressRegion, storeAddressDistrict }) => {
      if (storeAddressRegion === 'Hong Kong Island') {
        if (
          storeAddressDistrict === 'Central and Western District' ||
          storeAddressDistrict === 'Eastern District' ||
          storeAddressDistrict === 'Southern District' ||
          storeAddressDistrict === 'Wan Chai District'
        ) {
          return true;
        }
        return false;
      }
      if (storeAddressRegion === 'Kowloon') {
        if (
          storeAddressDistrict === 'Kowloon City District' ||
          storeAddressDistrict === 'Kwun Tong District' ||
          storeAddressDistrict === 'Sham Shui Po District' ||
          storeAddressDistrict === 'Wong Tai Sin District' ||
          storeAddressDistrict === 'Yau Tsim Mong District'
        ) {
          return true;
        }
        return false;
      }
      if (storeAddressRegion === 'New Territories') {
        if (
          storeAddressDistrict === 'Islands District' ||
          storeAddressDistrict === 'Kwai Tsing District' ||
          storeAddressDistrict === 'North District' ||
          storeAddressDistrict === 'Sai Kung District' ||
          storeAddressDistrict === 'Sha Tin District' ||
          storeAddressDistrict === 'Tai Po District' ||
          storeAddressDistrict === 'Tsuen Wan District' ||
          storeAddressDistrict === 'Tuen Mun District' ||
          storeAddressDistrict === 'Yuen Long District'
        ) {
          return true;
        }
        return false;
      }
      return true;
    },
    { path: ['storeAddressRegion'], message: 'theDistrictIsNotMatchTheRegion' }
  );
export type DeliveryOptionSchema = z.infer<typeof deliveryOptionSchema>;
