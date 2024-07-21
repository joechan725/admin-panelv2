import Edit from '@/components/icon/Edit';
import Eye from '@/components/icon/Eye';
import AvatarShow from '@/components/ui/image/AvatarShow';
import { dateDiffInDays } from '@/lib/helpers/date/dateDiffInDays';
import { User } from '@/models/user/User';
import clsx from 'clsx/lite';
import { Link } from '@/navigation';
import UserRole from '@/components/ui/UserRole';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import LoginMethodList from '@/components/ui/loginMethod/LoginMethodList';
import TrBody from '@/components/table/TrBody';
import Td from '@/components/table/Td';
import UpgradeUserToAdminButton from './UpgradeUserToAdminButton';
import DowngradeUserToAdminButton from './DowngradeUserToAdminButton';
import IconButton from '@/components/ui/button/IconButton';
import { useTranslations } from 'next-intl';
import { formatDate } from '@/lib/helpers/date/formatDate';
import { useLanguage } from '@/lib/hooks/language/useLanguage';

interface UserItemProps {
  user: User;
}

const UserItem = ({ user }: UserItemProps) => {
  const t = useTranslations('User.list');
  const { convertUserName } = useLanguage();

  const {
    id,
    createdAt,
    lastLoggedInAt,
    role,
    avatar,
    email,
    emailVerified,
    firstName,
    lastName,
    orderCount,
    registeredAt,
    totalSpent,
    providerData,
    isAdmin,
  } = user;

  const userName = convertUserName({
    firstName: firstName,
    lastName: lastName,
  });

  const lastLoggedInBeforeDay = lastLoggedInAt ? dateDiffInDays(new Date(), new Date(lastLoggedInAt)) : 0;
  const status = lastLoggedInBeforeDay < 7 ? 'Active' : 'Inactive';

  return (
    <TrBody>
      {/* user */}
      <Td>
        <Link href={`/admin/users/${id}`} className="group hover:opacity-85 active:opacity-70">
          <div className="flex items-center gap-4">
            <AvatarShow sizeClassName="size-10" image={avatar} />
            <div className="flex flex-col">
              <div className="truncate text-sm font-semibold text-primary-text group-hover:underline underline-offset-1">
                {userName}
              </div>
              <div className="truncate text-xs font-medium text-secondary-text group-hover:underline underline-offset-1">
                {email ?? 'N/A'}
              </div>
              <div
                className={clsx(
                  'text-xs py-0.5 px-1 rounded-md max-w-max font-medium',
                  emailVerified ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'
                )}
              >
                {emailVerified ? t('verified') : t('unverified')}
              </div>
            </div>
          </div>
        </Link>
      </Td>

      {/* createdAt */}
      <Td>
        <div className="truncate text-sm font-medium text-secondary-text">
          {createdAt ? formatDate(createdAt, 'short') : 'N/A'}
        </div>
      </Td>

      {/* registeredAt */}
      <Td>
        <div className="truncate text-sm font-medium text-secondary-text">
          {registeredAt ? formatDate(registeredAt, 'short') : 'N/A'}
        </div>
      </Td>

      {/* orderCount */}
      <Td>
        <div className="truncate text-sm font-medium text-secondary-text">{orderCount ?? 0}</div>
      </Td>

      {/* totalSpent */}
      <Td>
        <span className="truncate text-sm font-medium text-secondary-text">${(totalSpent ?? 0).toFixed(1)}</span>
      </Td>

      {/* status */}
      <Td>
        <div
          className={clsx(
            'text-xs py-1 px-2 rounded-md font-medium max-w-max',
            status === 'Active' && 'bg-success/15 text-success',
            status === 'Inactive' && 'bg-danger/15 text-danger'
          )}
        >
          {status === 'Active' && t('active')}
          {status === 'Inactive' && t('inactive')}
        </div>
      </Td>

      {/* role */}
      <Td>
        <UserRole userRole={role} />
      </Td>

      {/* Login Method */}
      <Td>
        <div className="flex gap-2 items-center flex-wrap max-w-24">
          <LoginMethodList userInfos={providerData} />
        </div>
      </Td>

      {/* actions */}
      <Td>
        <div className="flex items-center gap-2">
          <HoverPopup message={t('viewDetail')}>
            <IconButton disabled={false} theme="secondary" type="button">
              <Link href={`/admin/users/${id}`}>
                <Eye sizeClassName="size-5" />
              </Link>
            </IconButton>
          </HoverPopup>
          <HoverPopup message={t('edit')}>
            <IconButton disabled={false} theme="secondary" type="button">
              <Link href={`/admin/users/${id}/edit`}>
                <Edit sizeClassName="size-5" />
              </Link>
            </IconButton>
          </HoverPopup>
          {!isAdmin && <UpgradeUserToAdminButton user={user} />}
          {isAdmin && <DowngradeUserToAdminButton user={user} />}
        </div>
      </Td>
    </TrBody>
  );
};

export default UserItem;
