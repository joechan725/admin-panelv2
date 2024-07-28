import { z } from 'zod';

export const districtSchema = z.union([
  z.literal('Central and Western District', { message: 'invalidDistrict' }),
  z.literal('Eastern District', { message: 'invalidDistrict' }),
  z.literal('Southern District', { message: 'invalidDistrict' }),
  z.literal('Wan Chai District', { message: 'invalidDistrict' }),
  z.literal('Kowloon City District', { message: 'invalidDistrict' }),
  z.literal('Kwun Tong District', { message: 'invalidDistrict' }),
  z.literal('Sham Shui Po District', { message: 'invalidDistrict' }),
  z.literal('Wong Tai Sin District', { message: 'invalidDistrict' }),
  z.literal('Yau Tsim Mong District', { message: 'invalidDistrict' }),
  z.literal('Islands District', { message: 'invalidDistrict' }),
  z.literal('Kwai Tsing District', { message: 'invalidDistrict' }),
  z.literal('North District', { message: 'invalidDistrict' }),
  z.literal('Sai Kung District', { message: 'invalidDistrict' }),
  z.literal('Sha Tin District', { message: 'invalidDistrict' }),
  z.literal('Tai Po District', { message: 'invalidDistrict' }),
  z.literal('Tsuen Wan District', { message: 'invalidDistrict' }),
  z.literal('Tuen Mun District', { message: 'invalidDistrict' }),
  z.literal('Yuen Long District', { message: 'invalidDistrict' }),
]);
