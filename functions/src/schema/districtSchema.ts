import { z } from 'zod';

export const districtSchema = z.union([
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
]);
