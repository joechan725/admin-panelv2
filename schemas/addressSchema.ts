import { z } from 'zod';
import { districtSchema } from './districtSchema';
import { regionSchema } from './regionSchema';

export const addressSchema = z
  .object({
    region: regionSchema,
    district: districtSchema,
    detailAddress: z.string().min(1, 'required'),
    contactName: z.string().min(1, 'required'),
    contactPhoneNumber: z.string().min(8, 'phoneNumber8Digit').max(8, 'phoneNumber8Digit'),
    remark: z.string().min(1, 'required'),
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

export type AddressSchema = z.infer<typeof addressSchema>;
