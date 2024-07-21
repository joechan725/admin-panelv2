import { notFound } from 'next/navigation';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from './i18n/config';

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });
export { notFound };
