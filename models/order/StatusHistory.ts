import Stripe from 'stripe';
import { Image } from '../Image';
import { OrderStatus } from './OrderStatus';

export interface StatusHistory {
  id: string;
  status: OrderStatus;
  message?: string;
  images?: Image[];
  referenceUrl?: string;
  referenceNumber?: string;
  stripeRefund?: Stripe.Refund;
  createdAt: number;
  updatedAt: number;
}
