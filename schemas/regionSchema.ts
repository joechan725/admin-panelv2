import { z } from 'zod';

export const regionSchema = z.union([
  z.literal('Hong Kong Island'),
  z.literal('Kowloon'),
  z.literal('New Territories'),
]);
