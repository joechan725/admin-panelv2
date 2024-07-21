import { DeliveryOption } from './DeliveryOption';

export interface PrivateDeliveryOption extends DeliveryOption {
  // Statistic
  usageCount?: number;
  accumulativeDeliveryCharge?: number;
}
