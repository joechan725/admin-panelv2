import Bell from '@/components/icon/Bell';
import Cart from '@/components/icon/Cart';
import Comment from '@/components/icon/Comment';
import Document from '@/components/icon/Document';
import HeartHollow from '@/components/icon/HeartHollow';
import Home from '@/components/icon/Home';
import Lock from '@/components/icon/Lock';
import User from '@/components/icon/User';
import { NavLink } from '@/models/navLink/NavLink';
import { TranslationFunction } from '@/types/TranslationFunction';

export const getMyAccountNavLinks = (t: TranslationFunction): NavLink[] => [
  {
    href: `/my-account`,
    icon: <User sizeClassName="size-4" />,
    title: t('myProfile'),
  },
  {
    href: `/my-account/addresses`,
    icon: <Home sizeClassName="size-4" />,
    title: t('addresses'),
  },
  {
    href: `/my-account/orders`,
    icon: <Document sizeClassName="size-4" />,
    title: t('orders'),
  },
  {
    href: `/my-account/cart`,
    icon: <Cart sizeClassName="size-4" />,
    title: t('cart'),
  },
  {
    href: `/my-account/wishlist`,
    icon: <HeartHollow sizeClassName="size-4" />,
    title: t('wishlist'),
  },
  {
    href: `/my-account/comments`,
    icon: <Comment sizeClassName="size-4" />,
    title: t('comments'),
  },
  {
    href: `/my-account/notifications`,
    icon: <Bell sizeClassName="size-4" />,
    title: t('notifications'),
  },
  {
    href: `/my-account/change-password`,
    icon: <Lock sizeClassName="size-4" />,
    title: t('changePassword'),
  },
];
