'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface toggleSearchParamsParameters {
  key: string;
  value: string;
  originalSearchParams: ReadonlyURLSearchParams;
  originalPath: string;
  router: AppRouterInstance;
  scroll?: boolean;
}

// reference
// https://github.com/vercel/next.js/discussions/47583

export const toggleSearchParams = ({
  originalSearchParams,
  originalPath,
  router,
  key,
  value,
  scroll,
}: toggleSearchParamsParameters) => {
  const currentSearchParams = new URLSearchParams(Array.from(originalSearchParams.entries())); // -> has to use this form

  // Modified the key and value to no space bar.
  const modifiedKey = key.trim();
  const modifiedValue = value.trim();

  // checking if the key/value pair existed.
  if (currentSearchParams.has(modifiedKey, modifiedValue)) {
    // Delete the key/value pair if it existed.
    currentSearchParams.delete(modifiedKey, modifiedValue);
  } else {
    // Append the key/value pair if it was not existed.
    currentSearchParams.append(modifiedKey, modifiedValue);
  }

  currentSearchParams.sort();

  const updatedSearchParamsString = currentSearchParams.toString();
  const updatedPathWithSearchParamsString = originalPath + '?' + updatedSearchParamsString;
  router.push(updatedPathWithSearchParamsString, { scroll });
};
