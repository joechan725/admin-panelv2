import { PrivateProduct } from '@/models/product/PrivateProduct';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface ProductData extends Omit<PrivateProduct, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const privateProductConverter = {
  toFirestore: (product: PrivateProduct): DocumentData => {
    return product;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): PrivateProduct => {
    const productData = snapshot.data(options) as ProductData;
    return {
      ...productData,
      id: snapshot.id,
      createdAt: productData.createdAt.toMillis(),
      updatedAt: productData.updatedAt.toMillis(),
    };
  },
};
