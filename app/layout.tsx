'use client';

import { defaultLocale, locales } from '@/i18n/config';
import { usePathname, redirect } from 'next/navigation';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const path = usePathname();

  if (locales.some((locale) => path.startsWith(`/${locale}`))) {
    return children;
  }

  redirect(`/${defaultLocale}/${path}`);
};

export default RootLayout;
