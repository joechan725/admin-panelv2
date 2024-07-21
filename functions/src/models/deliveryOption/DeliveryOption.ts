import { District } from '../../types/District';
import { Region } from '../../types/Region';

export interface DeliveryOption {
  id: string;
  nameEN: string;
  nameZH: string;
  descriptionEN?: string;
  descriptionZH?: string;
  deliveryCharge: number;
  estimatedTimeEN: string;
  estimatedTimeZH: string;
  isPublic: boolean;
  freeDeliveryThreshold?: number;
  applyThresholdBeforeCoupons: boolean;
  deliveryProviderEN?: string;
  deliveryProviderZH?: string;

  // pick up and pick up location
  isPickUp: boolean;
  storeAddressId?: string;
  storeAddressName?: string;
  storeAddressRegion?: Region;
  storeAddressDistrict?: District;
  storeAddressDetailAddress?: string;
  storeAddressPhoneNumber?: string;
  storeAddressBusinessHours?: string;

  // Timestamp
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}
