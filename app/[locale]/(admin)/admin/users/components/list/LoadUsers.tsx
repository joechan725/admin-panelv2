'use client';

import { usePrivateUserListsListener } from '@/lib/hooks/user/admin/usePrivateUserListsListener';
import { useSearchParams } from 'next/navigation';
import { searchAndOrderUsers } from './searchAndOrderUsers';
import UserTable from './UserTable';

interface LoadUsersProps {}

const LoadUsers = ({}: LoadUsersProps) => {
  const { users, error, isLoading } = usePrivateUserListsListener();
  const searchParams = useSearchParams();
  const displayUsers = searchAndOrderUsers({ searchParams, users });

  return <UserTable displayUsers={displayUsers} users={users} isLoading={isLoading} error={error} />;
};

export default LoadUsers;
