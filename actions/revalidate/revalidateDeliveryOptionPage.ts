'use server';

import { IdTokenResult } from 'firebase/auth';
import { revalidatePath } from 'next/cache';

interface RevalidateDeliveryOptionPageParameter {
  idTokenResult?: IdTokenResult;
}

export const revalidateDeliveryOptionPage = ({ idTokenResult }: RevalidateDeliveryOptionPageParameter) => {
  const isAdmin = idTokenResult?.claims?.admin ? true : false;

  if (!isAdmin) {
    return;
  }

  setTimeout(() => {
    revalidatePath('/shipping-methods', 'page');
  }, 10000);
};
