'use client';

import clsx from 'clsx/lite';
import { Link, usePathname } from '@/navigation';
import { NavLink } from '@/models/navLink/NavLink';

interface VertNavItemProps {
  navLink: Omit<NavLink, 'nestedNavLinks' | 'icon' | 'ending'>;
  children: React.ReactNode;
}

const VertNavItem = ({ navLink, children }: VertNavItemProps) => {
  const path = usePathname();
  let { href } = navLink;

  if (!href.startsWith('/')) {
    href = '/' + href;
  }

  const isSelected = href === '/' ? path === '/' : path.startsWith(href);

  return (
    <Link className="w-full" href={href}>
      <div
        className={clsx(
          'flex gap-2 items-center justify-between rounded-md py-2 px-14',
          !isSelected && 'transition-all hover:bg-white/5 active:bg-white/10',
          isSelected && 'bg-secondary-bg'
        )}
      >
        <div className="flex-1 flex items-center justify-start gap-4 group">
          <div
            className={clsx('text-white/80 group-hover:font-semibold', isSelected ? 'font-semibold' : 'font-medium')}
          >
            {children}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VertNavItem;
