import { Product } from '@/models/product/Product';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface ProductData extends Omit<Product, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const productConverter = {
  toFirestore: (product: Product): DocumentData => {
    return product;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Product => {
    const productData = snapshot.data(options) as ProductData;
    return {
      ...productData,
      id: snapshot.id,
      createdAt: productData.createdAt.toMillis(),
      updatedAt: productData.updatedAt.toMillis(),
    };
  },
};
