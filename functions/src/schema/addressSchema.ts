import { Timestamp } from 'firebase-admin/firestore';
import { z } from 'zod';
import { regionSchema } from './regionSchema';
import { districtSchema } from './districtSchema';

export const addressSchema = z
  .object({
    remark: z.string().optional(),
    region: regionSchema,
    district: districtSchema,
    detailAddress: z.string(),
    contactName: z.string(),
    contactPhoneNumber: z.string().min(8).max(8),
    createdAt: z.instanceof(Timestamp),
    updatedAt: z.instanceof(Timestamp),
    deletedAt: z.instanceof(Timestamp).optional(),
  })
  .passthrough();
