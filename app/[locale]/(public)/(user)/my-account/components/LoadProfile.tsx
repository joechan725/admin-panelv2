'use client';

import UserProfile from '@/components/user/UserProfile';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import UserProfileSkeleton from '@/components/user/UserProfileSkeleton';
import { useSessionStore } from '@/stores/useSessionStore';

interface LoadUserProfileProps {}

const LoadProfile = ({}: LoadUserProfileProps) => {
  const { user, error, isLoading } = useSessionStore((state) => ({
    error: state.error,
    isLoading: state.isLoading,
    user: state.user,
  }));

  return (
    <div>
      {isLoading && <UserProfileSkeleton />}
      {!isLoading && user && <UserProfile user={user} />}
      <ErrorTranslation error={error} />
    </div>
  );
};

export default LoadProfile;
