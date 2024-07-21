'use client';

import Th from '@/components/table/Th';
import UserSkeleton from './UserSkeleton';
import PaginationClient from '@/components/search/PaginationClient';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import PaginationIndicatorClient from '@/components/search/PaginationIndicatorClient';
import UserList from './UserList';
import TrHead from '@/components/table/TrHead';
import { User } from '@/models/user/User';
import { useTranslations } from 'next-intl';

interface UserTableProps {
  isLoading: boolean;
  error?: string;
  users: User[];
  displayUsers: User[];
}

const UserTable = ({ isLoading, error, displayUsers, users }: UserTableProps) => {
  const t = useTranslations('User.list');

  return (
    <div className="mb-4 relative">
      {isLoading && <LoadingShimmer gradient="gray" roundedClassName="rounded-none" />}
      <table className="w-full">
        <thead>
          <TrHead>
            <Th searchParamsValue="user">{t('user')}</Th>
            <Th searchParamsValue="created-at">{t('firstVisitedAt')}</Th>
            <Th searchParamsValue="registered-at">{t('registeredAt')}</Th>
            <Th searchParamsValue="order">{t('order')}</Th>
            <Th searchParamsValue="total-spent">{t('totalSpent')}</Th>
            <Th searchParamsValue="status">{t('status')}</Th>
            <Th searchParamsValue="role">{t('role')}</Th>
            <Th>{t('loginMethod')}</Th>
            <Th>{t('actions')}</Th>
          </TrHead>
        </thead>
        <tbody>
          {isLoading && <UserSkeleton />}
          {!isLoading && <UserList users={displayUsers} />}
        </tbody>
      </table>
      {!isLoading && (!users || users.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItems')}</div>
      )}
      {users && users.length > 0 && (!displayUsers || displayUsers.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItemsMatchSearching')}</div>
      )}
      <ErrorTranslation error={error} />
      <div className="flex justify-between items-center mt-4 flex-wrap">
        <PaginationIndicatorClient itemName={t('indicator')} itemsLength={users?.length} />
        <PaginationClient theme="primary" itemsLength={users?.length} />
      </div>
    </div>
  );
};

export default UserTable;
