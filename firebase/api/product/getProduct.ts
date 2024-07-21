import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { productConverter } from '../../converter/product/productConverter';

export const getProduct = async (productId: string) => {
  const productRef = doc(db, `products/${productId}`).withConverter(productConverter);
  const productSnap = await getDoc(productRef);

  const product = productSnap.data();
  return product;
};
