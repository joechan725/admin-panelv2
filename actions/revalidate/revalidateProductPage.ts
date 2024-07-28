'use server';

import { revalidatePath } from 'next/cache';

interface RevalidateProductPageParameters {
  productIds: string[];
}

export const revalidateProductPage = ({ productIds }: RevalidateProductPageParameters) => {
  const timer = Math.max(10000, (productIds?.length ?? 1) * 1000);

  setTimeout(() => {
    productIds?.forEach((productId) => {
      revalidatePath(`/products/${productId}`, 'layout');
    });
  }, timer);
};
