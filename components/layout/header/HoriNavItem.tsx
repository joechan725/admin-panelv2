'use client';

import { Link, usePathname } from '@/navigation';
import { NavLink } from '@/models/navLink/NavLink';
import clsx from 'clsx/lite';

interface HoriNavItemProps {
  navLink: Omit<NavLink, 'nestedNavLinks' | 'icon' | 'ending'>;
  children: React.ReactNode;
}

const HoriNavItem = ({ navLink, children }: HoriNavItemProps) => {
  const path = usePathname();

  let { href } = navLink;

  if (!href.startsWith('/')) {
    href = '/' + href;
  }

  const mainHref = href.split('/')[1];

  const isSelected = href === '/' ? path === '/' : path.includes(mainHref);

  return (
    <Link
      href={href}
      className={clsx(
        'font-semibold',
        isSelected
          ? 'text-secondary-bg'
          : 'transition-all text-primary-text hover:text-secondary-bg active:text-secondary-bg/70'
      )}
    >
      {children}
    </Link>
  );
};

export default HoriNavItem;
