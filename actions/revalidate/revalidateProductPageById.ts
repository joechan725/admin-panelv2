'use server';

import { IdTokenResult } from 'firebase/auth';
import { revalidatePath } from 'next/cache';

interface RevalidateProductPageByIdParameters {
  idTokenResult?: IdTokenResult;
  productIds: string[];
}

export const revalidateProductPageById = ({ idTokenResult, productIds }: RevalidateProductPageByIdParameters) => {
  const isAdmin = idTokenResult?.claims?.admin ? true : false;

  if (!isAdmin) {
    return;
  }

  setTimeout(() => {
    revalidatePath('/products/page', 'layout');
    revalidatePath('/products/search', 'layout');
    productIds.forEach((productId) => {
      revalidatePath(`/products/${productId}`, 'layout');
    });
  }, 10000);
};
