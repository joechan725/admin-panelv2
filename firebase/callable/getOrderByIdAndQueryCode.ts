import { httpsCallable } from 'firebase/functions';
import { functions } from '../config';
import { Order } from '@/models/order/Order';

interface Request {
  orderId: string;
  queryCode: string;
}

interface Response {
  order: Order;
}

export const getOrderByIdAndQueryCode = httpsCallable<Request, Response>(functions, 'getOrderByIdAndQueryCode');
