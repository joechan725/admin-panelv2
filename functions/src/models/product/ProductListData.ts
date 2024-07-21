import { Timestamp } from 'firebase-admin/firestore';
import { ProductData } from './ProductData';

export interface ProductListData {
  products: (ProductData & { id: string })[];
  ids: string[];
  itemCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
