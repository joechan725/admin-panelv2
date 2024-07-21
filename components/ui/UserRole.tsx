import Globe from '@/components/icon/Globe';
import User from '@/components/icon/User';
import UserPlus from '@/components/icon/UserPlus';
import clsx from 'clsx/lite';
import { useTranslations } from 'next-intl';

interface UserRoleProps {
  userRole: 'admin' | 'user' | 'anonymous';
}

const UserRole = ({ userRole }: UserRoleProps) => {
  const t = useTranslations('UserAuth');

  return (
    <div className="flex gap-2 items-center">
      <div
        className={clsx(
          'p-0.5 rounded-full',
          userRole === 'admin' && 'bg-warning/10',
          userRole === 'user' && 'bg-safe/10',
          userRole === 'anonymous' && 'bg-gray-500/10'
        )}
      >
        {userRole === 'admin' && <UserPlus sizeClassName="size-5" className="text-warning" />}
        {userRole === 'user' && <User sizeClassName="size-5" className="text-safe" />}
        {userRole === 'anonymous' && <Globe sizeClassName="size-5" className="text-gray-500" />}
      </div>
      <span
        className={clsx(
          'text-xs truncate font-semibold',
          userRole === 'admin' && 'text-warning',
          userRole === 'user' && 'text-safe',
          userRole === 'anonymous' && 'text-tertiary-text'
        )}
      >
        {userRole === 'admin' && t('admin')}
        {userRole === 'user' && t('user')}
        {userRole === 'anonymous' && t('anonymous')}
      </span>
    </div>
  );
};

export default UserRole;
