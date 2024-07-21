'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface removeSearchParamsParameters {
  key: string;
  originalSearchParams: ReadonlyURLSearchParams;
  originalPath: string;
  router: AppRouterInstance;
  scroll?: boolean;
}

// reference
// https://github.com/vercel/next.js/discussions/47583

export const removeSearchParams = ({
  originalSearchParams,
  originalPath,
  router,
  key,
  scroll,
}: removeSearchParamsParameters) => {
  const currentSearchParams = new URLSearchParams(Array.from(originalSearchParams.entries())); // -> has to use this form

  // Modified the key and value to no space bar.
  const modifiedKey = key.trim();

  // Delete the key.
  currentSearchParams.delete(modifiedKey);

  currentSearchParams.sort();

  const updatedSearchParamsString = currentSearchParams.toString();
  const updatedPathWithSearchParamsString = originalPath + '?' + updatedSearchParamsString;
  router.push(updatedPathWithSearchParamsString, { scroll });
};
