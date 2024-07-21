import { NavLink } from '@/models/navLink/NavLink';

interface GetProductNavLinksParameters {
  productId: string;
  t: (key: string) => string;
}

export const getProductNavLinks = ({ productId, t }: GetProductNavLinksParameters): NavLink[] => [
  {
    title: t('productDetail'),
    href: `/products/${productId}`,
  },
  {
    title: t('clientsComments'),
    href: `/products/${productId}/comments/page/1`,
  },
];
