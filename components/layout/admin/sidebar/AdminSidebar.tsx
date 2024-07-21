import Link from 'next/link';
import AdminNavItemList from './AdminNavItemList';
import StoreFront from '@/components/icon/StoreFront';
import LeftArrow from '@/components/icon/LeftArrow';
import clsx from 'clsx/lite';
import { useTranslations } from 'next-intl';

interface AdminSidebarProps {
  onClose?: () => void;
  className?: string;
}

const AdminSidebar = ({ onClose, className }: AdminSidebarProps) => {
  const t = useTranslations('General');

  return (
    <div className={clsx('min-h-screen max-w-64 w-full py-6 space-y-8 bg-primary-bg', className)}>
      {/* Logo and website name */}
      <div className="flex justify-between pl-9 pr-7">
        <Link href="/">
          <div className="flex gap-2 items-center">
            <StoreFront sizeClassName="size-8" className="text-white/50" />
            <div className="text-white text-2xl font-semibold">{t('companyName')}</div>
          </div>
        </Link>
        {onClose && (
          <button type="button" onClick={onClose}>
            <LeftArrow className="transition-all text-white hover:text-secondary-bg active:text-secondary-bg/70" />
          </button>
        )}
      </div>
      {/* Nav Links */}
      <AdminNavItemList />
    </div>
  );
};

export default AdminSidebar;
