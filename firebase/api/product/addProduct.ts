import { Product } from '@/models/product/Product';
import { addDoc, collection, FieldValue } from 'firebase/firestore';
import { db } from '../../config';

export interface AddProductFirestoreData extends Omit<Product, 'createdAt' | 'updatedAt' | 'id'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export const addProduct = async (productFirestoreData: AddProductFirestoreData) => {
  const productsRef = collection(db, 'products');

  // Upload the new product
  const res = await addDoc(productsRef, productFirestoreData);

  // return the uploaded doc id
  const id = res.id;

  return id;
};
