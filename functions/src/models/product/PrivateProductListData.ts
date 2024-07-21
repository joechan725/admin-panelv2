import { Timestamp } from 'firebase-admin/firestore';
import { PrivateProductData } from './PrivateProductData';

export interface PrivateProductListData {
  products: (PrivateProductData & { id: string })[];
  ids: string[];
  itemCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
