'use client';

import { useSessionStore } from '@/stores/useSessionStore';
import EditProfileForm from './EditProfileForm';

interface LoadEditProfileFormProps {}

const LoadEditProfileForm = ({}: LoadEditProfileFormProps) => {
  const { user } = useSessionStore((state) => ({
    error: state.error,
    isLoading: state.isLoading,
    user: state.user,
  }));

  return user && <EditProfileForm user={user} />;
};

export default LoadEditProfileForm;
