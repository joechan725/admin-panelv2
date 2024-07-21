'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface setSearchParamsParameters {
  key: string;
  value: string;
  originalSearchParams: ReadonlyURLSearchParams;
  originalPath: string;
  router: AppRouterInstance;
  scroll?: boolean;
}

// reference
// https://github.com/vercel/next.js/discussions/47583

export const setSearchParams = ({
  originalSearchParams,
  originalPath,
  router,
  key,
  value,
  scroll,
}: setSearchParamsParameters) => {
  const currentSearchParams = new URLSearchParams(Array.from(originalSearchParams.entries())); // -> has to use this form

  // Modified the key and value to no space bar.
  const modifiedKey = key.trim();
  const modifiedValue = value.trim();

  if (modifiedValue === '' || modifiedValue === null || modifiedValue === undefined) {
    currentSearchParams.delete(modifiedKey);
  } else {
    currentSearchParams.set(modifiedKey, modifiedValue);
  }

  currentSearchParams.sort();

  const updatedSearchParamsString = currentSearchParams.toString();
  const updatedPathWithSearchParamsString = originalPath + '?' + updatedSearchParamsString;
  router.push(updatedPathWithSearchParamsString, { scroll });
};
