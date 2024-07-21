import { NavLink } from '@/models/navLink/NavLink';
import { TranslationFunction } from '@/types/TranslationFunction';

export const getPublicNavLinks = (t: TranslationFunction): Omit<NavLink, 'nestedNavLinks' | 'icon' | 'ending'>[] => [
  {
    href: '/',
    title: t('home'),
  },
  {
    href: '/products/page/1',
    title: t('products'),
  },
  {
    href: '/about-us',
    title: t('aboutUs'),
  },
];
