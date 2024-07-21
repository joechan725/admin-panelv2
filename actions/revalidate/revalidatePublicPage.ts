'use server';

import { IdTokenResult } from 'firebase/auth';
import { revalidatePath } from 'next/cache';

interface RevalidatePublicPageParameters {
  idTokenResult?: IdTokenResult;
}

export const revalidatePublicPage = async ({ idTokenResult }: RevalidatePublicPageParameters) => {
  const isAdmin = idTokenResult?.claims?.admin ? true : false;

  if (!isAdmin) {
    return;
  }

  setTimeout(() => {
    revalidatePath('/(public)', 'layout');
  }, 10000);
};
