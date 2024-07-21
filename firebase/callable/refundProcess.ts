import { Order } from '@/models/order/Order';
import { httpsCallable } from 'firebase/functions';
import Stripe from 'stripe';
import { functions } from '../config';

interface Request {
  orderId: string;
  amount: number | 'all';
  order?: Order;
  message?: string;
  referenceUrl?: string;
  referenceNumber?: string;
}

interface Response {
  success: boolean;
  refund: Stripe.Refund;
}

export const refundProcess = httpsCallable<Request, Response>(functions, 'refundProcess');
