import { PrivateProduct } from '@/models/product/PrivateProduct';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface PrivateProductData extends Omit<PrivateProduct, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface PrivateProductListData {
  products: (PrivateProductData & { id: string })[];
  ids: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const privateProductListConverter = {
  toFirestore: (privateProductList: PrivateProduct[]): DocumentData => {
    return privateProductList;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): PrivateProduct[] => {
    const privateProductListData = snapshot.data(options) as PrivateProductListData;

    const productsData = privateProductListData.products;

    const products: PrivateProduct[] = productsData.map(
      (productsData): PrivateProduct => ({
        ...productsData,
        createdAt: productsData.createdAt.toMillis(),
        updatedAt: productsData.updatedAt.toMillis(),
      })
    );

    return products;
  },
};
