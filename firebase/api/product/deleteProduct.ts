import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/config';

export const deleteProduct = async (productId: string) => {
  const productRef = doc(db, `products/${productId}`);

  await deleteDoc(productRef);
};
