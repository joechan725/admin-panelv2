import { z } from 'zod';

export const regionSchema = z.union([
  z.literal('Hong Kong Island', { message: 'invalidRegion' }),
  z.literal('Kowloon', { message: 'invalidRegion' }),
  z.literal('New Territories', { message: 'invalidRegion' }),
]);
