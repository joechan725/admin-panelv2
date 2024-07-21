import { httpsCallable } from 'firebase/functions';
import { functions } from '../config';

interface Request {
  pendingOrderId: string;
}

interface Response {}

export const verifyStockPrePayment = httpsCallable<Request, Response>(functions, 'verifyStockPrePayment');
