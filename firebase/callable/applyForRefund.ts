import { httpsCallable } from 'firebase/functions';
import { functions } from '../config';
import { Image } from '@/models/Image';

interface FormData {
  refundReason: string;
}

interface Request {
  orderId: string;
  queryCode?: string;
  formData: FormData;
  images: Image[];
}

interface Response {
  success: boolean;
}

export const applyForRefund = httpsCallable<Request, Response>(functions, 'applyForRefund');
