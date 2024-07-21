import ChartBar from '@/components/icon/ChartBar';
import Cart from '@/components/icon/Cart';
import Tag from '@/components/icon/Tag';
import Document from '@/components/icon/Document';
import User from '@/components/icon/User';
import Ticket from '@/components/icon/Ticket';
import Cog6Tooth from '@/components/icon/Cog6Tooth';
import Comment from '@/components/icon/Comment';
import BellAlert from '@/components/icon/BellAlert';
import OrderBadgeCount from './sidebar/OrderBadgeCount';
import Trunk from '@/components/icon/Trunk';
import { NavLink } from '@/models/navLink/NavLink';
import Email from '@/components/icon/Email';
import { TranslationFunction } from '@/types/TranslationFunction';

export const getAdminNavLinks = (tAdmin: TranslationFunction): NavLink[] => [
  {
    title: tAdmin('dashboard'),
    href: '/admin',
    icon: <ChartBar sizeClassName="size-5" />,
  },
  {
    title: tAdmin('products'),
    href: '/admin/products',
    icon: <Cart sizeClassName="size-5" />,
    nestedNavLinks: [
      {
        title: tAdmin('productList'),
        href: '/admin/products',
      },
      {
        title: tAdmin('addAProduct'),
        href: '/admin/products/create',
      },
    ],
  },
  {
    title: tAdmin('categories'),
    href: '/admin/categories',
    icon: <Tag sizeClassName="size-5" />,
  },
  {
    title: tAdmin('orders'),
    href: '/admin/orders',
    icon: <Document sizeClassName="size-5" />,
    ending: <OrderBadgeCount />,
  },
  {
    title: tAdmin('users'),
    href: '/admin/users',
    icon: <User sizeClassName="size-5" />,
  },
  {
    title: tAdmin('comments'),
    href: '/admin/comments',
    icon: <Comment sizeClassName="size-5" />,
  },
  {
    title: tAdmin('coupons'),
    href: '/admin/coupons',
    icon: <Ticket sizeClassName="size-5" />,
  },
  {
    title: tAdmin('deliveryOptions'),
    href: '/admin/delivery-options',
    icon: <Trunk sizeClassName="size-5" />,
  },
  {
    title: tAdmin('promotions'),
    href: '/admin/promotions',
    icon: <Email sizeClassName="size-5" />,
    nestedNavLinks: [
      {
        title: tAdmin('promotionList'),
        href: '/admin/promotions',
      },
      {
        title: tAdmin('addAPromotion'),
        href: '/admin/promotions/create',
      },
    ],
  },
  {
    title: tAdmin('smartBars'),
    href: '/admin/smart-bars',
    icon: <BellAlert sizeClassName="size-5" />,
    nestedNavLinks: [
      {
        title: tAdmin('smartBarList'),
        href: '/admin/smart-bars',
      },
      {
        title: tAdmin('addASmartBar'),
        href: '/admin/smart-bars/create',
      },
    ],
  },
  {
    title: tAdmin('settings'),
    href: '/admin/settings',
    icon: <Cog6Tooth sizeClassName="size-5" />,
    nestedNavLinks: [
      {
        title: tAdmin('storeAddresses'),
        href: '/admin/settings/store-addresses',
      },
      {
        title: tAdmin('contactUs'),
        href: '/admin/settings/contact-us',
      },
    ],
  },
];
