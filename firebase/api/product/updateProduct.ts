import { doc, FieldValue, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Product } from '@/models/product/Product';
import { ExtendWithFieldValue } from '@/types/ExtendWithFieldValue';

export interface UpdateProductFirestoreData
  extends ExtendWithFieldValue<
    Partial<
      Omit<Product, 'createdAt' | 'updatedAt' | 'id' | 'commentCount' | 'orderCount' | 'revenue' | 'ratingsBrakeDown'>
    >
  > {
  updatedAt: FieldValue;
}

interface UpdateProductParameters {
  productId: string;
  productFirestoreData: UpdateProductFirestoreData;
}

export const updateProduct = async ({ productId, productFirestoreData }: UpdateProductParameters) => {
  // Prepare
  const productRef = doc(db, `/products/${productId}`);

  const updatedProduct = {
    ...productFirestoreData,
  };

  // Update the product
  await updateDoc(productRef, updatedProduct);
};
