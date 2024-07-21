import Bell from '@/components/icon/Bell';
import Cart from '@/components/icon/Cart';
import Comment from '@/components/icon/Comment';
import Document from '@/components/icon/Document';
import HeartHollow from '@/components/icon/HeartHollow';
import Home from '@/components/icon/Home';
import User from '@/components/icon/User';
import { NavLink } from '@/models/navLink/NavLink';
import { TranslationFunction } from '@/types/TranslationFunction';

export const getUserNavLinks = (userId: string, tUser: TranslationFunction): NavLink[] => [
  {
    href: `/admin/users/${userId}`,
    icon: <User sizeClassName="size-4" />,
    title: tUser('userProfile'),
  },
  {
    href: `/admin/users/${userId}/addresses`,
    icon: <Home sizeClassName="size-4" />,
    title: tUser('addresses'),
  },
  {
    href: `/admin/users/${userId}/orders`,
    icon: <Document sizeClassName="size-4" />,
    title: tUser('orders'),
  },
  {
    href: `/admin/users/${userId}/cart`,
    icon: <Cart sizeClassName="size-4" />,
    title: tUser('cart'),
  },
  {
    href: `/admin/users/${userId}/wishlist`,
    icon: <HeartHollow sizeClassName="size-4" />,
    title: tUser('wishlist'),
  },
  {
    href: `/admin/users/${userId}/comments`,
    icon: <Comment sizeClassName="size-4" />,
    title: tUser('comments'),
  },
  {
    href: `/admin/users/${userId}/notifications`,
    icon: <Bell sizeClassName="size-4" />,
    title: tUser('notifications'),
  },
];
