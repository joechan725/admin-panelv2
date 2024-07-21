'use client';

import { removeExtraSpaces } from '@/lib/helpers/string/removeExtraSpaces';
import { NavLink } from '@/models/navLink/NavLink';
import clsx from 'clsx/lite';
import { Link, usePathname } from '@/navigation';

interface SubSideBarNavItemProps {
  subNavLink: Omit<NavLink, 'nestedNavLinks'>;
  index: number;
}

const SubSideBarNavItem = ({ subNavLink, index }: SubSideBarNavItemProps) => {
  const path = usePathname();

  let { title, href, icon } = subNavLink;

  title = removeExtraSpaces(title);

  const isSelected =
    index === 0 ? path === href || path === `${href}/create` || path === `/edit` : path.startsWith(href);

  if (!href.startsWith('/')) {
    href = '/' + href;
  }

  return (
    <Link href={href} className="block w-full">
      <div
        className={clsx(
          'flex items-center gap-2 py-2 px-4 rounded-md group',
          !isSelected && 'hover:bg-tertiary-text/25 active:bg-tertiary-text/40',
          isSelected && 'bg-secondary-bg'
        )}
      >
        <div
          className={clsx(
            'font-semibold p-1 rounded-full',
            !isSelected && 'text-tertiary-text group-hover:bg-tertiary-text/30 group-active:bg-tertiary-text/50',
            isSelected && 'text-white/80'
          )}
        >
          {icon}
        </div>
        <div
          className={clsx(
            'text-sm md:text-base font-semibold',
            !isSelected && 'text-tertiary-text',
            isSelected && 'text-white/80'
          )}
        >
          {title}
        </div>
      </div>
    </Link>
  );
};

export default SubSideBarNavItem;
