'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface removeAllSearchParamsParameters {
  originalPath: string;
  router: AppRouterInstance;
  scroll?: boolean;
}

// reference
// https://github.com/vercel/next.js/discussions/47583

export const removeAllSearchParams = ({ originalPath, router, scroll }: removeAllSearchParamsParameters) => {
  router.push(originalPath, { scroll });
};
