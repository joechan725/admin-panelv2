import { Product } from '@/models/product/Product';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface ProductData extends Omit<Product, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface ProductListData {
  products: (ProductData & { id: string })[];
  ids: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const productListConverter = {
  toFirestore: (productList: Product[]): DocumentData => {
    return productList;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Product[] => {
    const productListData = snapshot.data(options) as ProductListData;

    const productsData = productListData.products;

    const products: Product[] = productsData.map(
      (productsData): Product => ({
        ...productsData,
        createdAt: productsData.createdAt.toMillis(),
        updatedAt: productsData.updatedAt.toMillis(),
      })
    );

    return products;
  },
};
