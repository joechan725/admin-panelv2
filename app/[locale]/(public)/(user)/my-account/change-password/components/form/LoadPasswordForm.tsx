'use client';

import ErrorTranslation from '@/components/form/ErrorTranslation';
import { useSessionStore } from '@/stores/useSessionStore';
import ChangePasswordForm from './ChangePasswordForm';
import AddPasswordForm from './AddPasswordForm';
import AddEmailPasswordForm from './AddEmailPasswordForm';

interface LoadPasswordFormProps {}

const LoadPasswordForm = ({}: LoadPasswordFormProps) => {
  const { userFireAuthData, isLoading, error } = useSessionStore((state) => ({
    userFireAuthData: state.userFireAuthData,
    isLoading: state.isLoading,
    error: state.error,
  }));

  if (isLoading) {
    return null;
  }

  if (!userFireAuthData) {
    return <ErrorTranslation error="unexpectedError" />;
  }

  const { providerData, email } = userFireAuthData;

  const hasEmailPasswordProvider = providerData.some((provider) => provider.providerId === 'password');

  if (hasEmailPasswordProvider) {
    return <ChangePasswordForm />;
  }

  if (email) {
    return <AddPasswordForm email={email} userInfos={providerData} />;
  }

  return <AddEmailPasswordForm userInfos={providerData} />;
};

export default LoadPasswordForm;
