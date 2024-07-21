import { z } from 'zod';

export const orderStatusSchema = z.object({
  status: z.union([
    z.literal('Placed'),
    z.literal('Paid'),
    z.literal('Delivering'),
    z.literal('Ready for Pickup'),
    z.literal('Delivered'),
    z.literal('Picked Up'),
    z.literal('Application for Refund'),
    z.literal('Refund Request Reject'),
    z.literal('Refund Pending'),
    z.literal('Refund Failed'),
    z.literal('Refund Cancelled'),
    z.literal('Refunded'),
  ]),
  message: z.string().optional(),
  referenceUrl: z.string().url('invalidUrl').or(z.literal('')),
  referenceNumber: z.string().optional(),
});

export type OrderStatusSchema = z.infer<typeof orderStatusSchema>;
