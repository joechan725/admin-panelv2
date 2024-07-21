import { z } from 'zod';

export const storeAddressSchema = z
  .object({
    region: z.union([z.literal('Hong Kong Island'), z.literal('Kowloon'), z.literal('New Territories')]),
    district: z.union([
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
    detailAddress: z.string().min(1, 'required'),
    phoneNumber: z.string().min(8, 'phoneNumber8Digit').max(8, 'phoneNumber8Digit'),
    name: z.string().min(1, 'required'),
    businessHours: z.string().min(1, 'required'),
  })
  .refine(
    ({ region, district }) => {
      if (region === 'Hong Kong Island') {
        if (
          district === 'Central and Western District' ||
          district === 'Eastern District' ||
          district === 'Southern District' ||
          district === 'Wan Chai District'
        ) {
          return true;
        }
        return false;
      }
      if (region === 'Kowloon') {
        if (
          district === 'Kowloon City District' ||
          district === 'Kwun Tong District' ||
          district === 'Sham Shui Po District' ||
          district === 'Wong Tai Sin District' ||
          district === 'Yau Tsim Mong District'
        ) {
          return true;
        }
        return false;
      }
      if (region === 'New Territories') {
        if (
          district === 'Islands District' ||
          district === 'Kwai Tsing District' ||
          district === 'North District' ||
          district === 'Sai Kung District' ||
          district === 'Sha Tin District' ||
          district === 'Tai Po District' ||
          district === 'Tsuen Wan District' ||
          district === 'Tuen Mun District' ||
          district === 'Yuen Long District'
        ) {
          return true;
        }
        return false;
      }
      return true;
    },
    { path: ['region'], message: 'districtIsNotMatchTheRegion' }
  );

export type StoreAddressSchema = z.infer<typeof storeAddressSchema>;
