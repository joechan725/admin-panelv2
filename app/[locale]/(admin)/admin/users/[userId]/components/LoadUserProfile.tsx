'use client';

import { useAdminUser } from '@/lib/hooks/user/admin/useAdminUser';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import UserProfile from '@/components/user/UserProfile';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import UserProfileSkeleton from '@/components/user/UserProfileSkeleton';

interface LoadUserProfileProps {}

const LoadUserProfile = ({}: LoadUserProfileProps) => {
  const params = useParams();
  const userId = params.userId;

  const { user, loadUser, isLoading, error } = useAdminUser();

  useEffect(() => {
    if (typeof userId !== 'string') {
      return;
    }
    loadUser(userId);
  }, []);

  if (!isLoading && !user) {
    notFound();
  }

  return (
    <div>
      {isLoading && <UserProfileSkeleton />}
      {!isLoading && user && <UserProfile user={user} />}
      {error && <ErrorTranslation error={error} />}
    </div>
  );
};

export default LoadUserProfile;
