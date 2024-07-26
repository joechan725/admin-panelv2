import { z } from 'zod';
import { regionSchema } from './regionSchema';
import { districtSchema } from './districtSchema';

export const orderPlacementSchema = z
  .object({
    couponCodes: z.array(z.string()).optional(),
    isPickUp: z.boolean(),
    // delivery address
    deliveryAddressId: z.string().optional(),
    deliveryRegion: regionSchema,
    deliveryDistrict: districtSchema,
    deliveryDetailAddress: z.string(),
    contactName: z.string(),
    contactPhoneNumber: z.string(),
    addressRemark: z.string().optional(),
    storeName: z.string().optional(),
    storePhoneNumber: z.string().optional(),
    storeBusinessHours: z.string().optional(),
    // delivery option
    deliveryOptionId: z.string(),
    deliveryOptionNameZH: z.string(),
    deliveryOptionNameEN: z.string(),
    deliveryOptionDescriptionEN: z.string().optional(),
    deliveryOptionDescriptionZH: z.string().optional(),
    deliveryOptionDeliveryCharge: z.number().nonnegative(),
    deliveryOptionDeliveryProviderEN: z.string().optional(),
    deliveryOptionDeliveryProviderZH: z.string().optional(),
    deliveryOptionEstimatedTimeEN: z.string().optional(),
    deliveryOptionEstimatedTimeZH: z.string().optional(),
    deliveryOptionFreeDeliveryThreshold: z.number().optional(),
  })
  .passthrough();
