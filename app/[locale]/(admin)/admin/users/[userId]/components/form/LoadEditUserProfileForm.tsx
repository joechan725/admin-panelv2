'use client';

import { useAdminUser } from '@/lib/hooks/user/admin/useAdminUser';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import EditUserProfileForm from './EditUserProfileForm';
import LoadingSpin from '@/components/loading/LoadingSpin';

interface LoadEditUserProfileFormProps {}

const LoadEditUserProfileForm = ({}: LoadEditUserProfileFormProps) => {
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
    <>
      {isLoading && <LoadingSpin theme="primary" layout="global" />}
      {!isLoading && user && <EditUserProfileForm user={user} />}
      <ErrorTranslation error={error} />
    </>
  );
};

export default LoadEditUserProfileForm;
