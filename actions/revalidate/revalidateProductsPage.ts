'use server';

import { IdTokenResult } from 'firebase/auth';
import { revalidatePath } from 'next/cache';

interface RevalidateProductsPageParameters {
  idTokenResult?: IdTokenResult;
  productIds: string[];
}

export const revalidateProductsPage = ({ idTokenResult, productIds }: RevalidateProductsPageParameters) => {
  const isAdmin = idTokenResult?.claims?.admin ? true : false;

  if (!isAdmin) {
    return;
  }

  const timer = Math.max(10000, (productIds?.length ?? 1) * 1000);

  setTimeout(() => {
    revalidatePath('/products/page', 'layout');
    revalidatePath('/products/search', 'layout');
    productIds.forEach((productId) => {
      revalidatePath(`/products/${productId}`, 'layout');
    });
  }, timer);
};
