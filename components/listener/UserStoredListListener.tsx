'use client';

import { useUserStoredListListener } from '@/lib/hooks/user/user/useUserStoredListListener';

interface UserStoredListListenerProps {}

const UserStoredListListener = ({}: UserStoredListListenerProps) => {
  useUserStoredListListener();
  return null;
};

export default UserStoredListListener;
