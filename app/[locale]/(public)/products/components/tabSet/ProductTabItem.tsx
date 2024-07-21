'use client';

import { NavLink } from '@/models/navLink/NavLink';
import clsx from 'clsx/lite';
import { Link, usePathname } from '@/navigation';
import { useParams } from 'next/navigation';

interface ProductTabItemProps {
  navLink: NavLink;
  children: React.ReactNode;
}

const ProductTabItem = ({ navLink, children }: ProductTabItemProps) => {
  const path = usePathname();
  const params = useParams<{ productId: string }>();
  const { productId } = params;

  const { href } = navLink;

  const isSelected = href === `/products/${productId}` ? path === `/products/${productId}` : path.startsWith(href);

  return (
    <Link href={href} className="w-full flex justify-center">
      <div
        className={clsx(
          isSelected ? 'border-secondary-bg' : 'border-transparent hover:border-secondary-bg/80',
          'border-b-2 py-1 md:px-8'
        )}
      >
        <div className="text-sm sm:text-base md:text-xl font-semibold text-primary-text">{children}</div>
      </div>
    </Link>
  );
};
export default ProductTabItem;
