'use client';

import ChevronRight from '@/components/icon/ChevronRight';
import clsx from 'clsx/lite';
import { usePathname, useRouter } from '@/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminNavNestedItem from './AdminNavNestedItem';
import { NavLink } from '@/models/navLink/NavLink';

interface AdminNavItemProps {
  adminNavLink: NavLink;
  children: React.ReactNode;
}

const AdminNavItem = ({ adminNavLink, children }: AdminNavItemProps) => {
  const router = useRouter();
  const path = usePathname();
  let { href, icon, ending, nestedNavLinks } = adminNavLink;

  if (!href.startsWith('/')) {
    href = '/' + href;
  }

  const isSelected = href === '/admin' ? path === '/admin' : path.startsWith(href);
  const [isShow, setIsShow] = useState(isSelected);

  const hasNestedNavLinks = nestedNavLinks && nestedNavLinks.length > 0;

  const toggleIsShow = () => {
    setIsShow((prevIsShow) => !prevIsShow);
  };

  const handleClick = () => {
    if (hasNestedNavLinks) {
      toggleIsShow();
      return;
    }
    router.push(href);
  };

  return (
    <div className="flex flex-col gap-1">
      <button className="w-full" onClick={handleClick}>
        <div
          className={clsx(
            'flex gap-2 items-center justify-between rounded-md py-2 px-4',
            !isShow && !isSelected && 'hover:bg-white/5 active:bg-white/10',
            isShow && !isSelected && 'bg-white/10',
            isSelected && 'bg-secondary-bg'
          )}
        >
          <div className="flex-1 flex items-center justify-start gap-4 group">
            <div className="p-1 rounded-full text-white/80 group-hover:bg-white/10 group-active:bg-white/15">
              {icon}
            </div>
            <div className={clsx('text-white/80', (isShow || isSelected) && 'font-semibold')}>{children}</div>
          </div>
          {ending && <div className="flex-0">{ending}</div>}
          {hasNestedNavLinks && (
            <motion.div animate={{ rotate: isShow ? 90 : 0 }} className="flex-0">
              <ChevronRight className="text-white/80 transition-all" sizeClassName="size-5" />
            </motion.div>
          )}
        </div>
      </button>
      {hasNestedNavLinks && (
        <motion.div
          animate={{ height: isShow ? 'auto' : 0 }}
          className={clsx('overflow-hidden flex flex-col gap-1', isShow ? 'h-full' : 'h-0')}
        >
          {nestedNavLinks.map((nestedNavLink) => (
            <AdminNavNestedItem nestedNavLink={nestedNavLink} key={nestedNavLink.href} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AdminNavItem;
