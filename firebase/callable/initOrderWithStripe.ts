import { httpsCallable } from 'firebase/functions';
import { functions } from '../config';
import { Order } from '@/models/order/Order';
import { Region } from '@/types/Region';
import { District } from '@/types/District';

interface Request {
  formData: OrderPlacementFormData;
}

interface Response {
  pendingOrder: Order;
  clientSecret: string | undefined;
}

interface OrderPlacementFormData {
  couponCodes: string[];
  isPickUp: boolean;
  deliveryAddressId?: string;
  deliveryRegion: Region;
  deliveryDistrict: District;
  deliveryDetailAddress: string;
  contactName: string;
  contactPhoneNumber: string;
  addressRemark?: string;
  storeName?: string;
  storePhoneNumber?: string;
  deliveryOptionId: string;
  deliveryOptionNameZH: string;
  deliveryOptionNameEN: string;
  deliveryOptionDescriptionZH?: string;
  deliveryOptionDescriptionEN?: string;
  deliveryOptionDeliveryCharge: number;
  deliveryOptionDeliveryProviderZH?: string;
  deliveryOptionDeliveryProviderEN?: string;
  deliveryOptionEstimatedTimeZH?: string;
  deliveryOptionEstimatedTimeEN?: string;
  deliveryOptionFreeDeliveryThreshold?: number;
}

export const initOrderWithStripe = httpsCallable<Request, Response>(functions, 'initOrderWithStripe');
