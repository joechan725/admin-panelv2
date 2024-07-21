'use client';

import LoadingSpin from '@/components/loading/LoadingSpin';
import { useSessionStore } from '@/stores/useSessionStore';
import { redirect } from '@/navigation';

interface CheckIsLoggedInProps {
  children: React.ReactNode;
}

const CheckIsLoggedIn = ({ children }: CheckIsLoggedInProps) => {
  const { isLoading, status } = useSessionStore((state) => ({
    isLoading: state.isLoading,
    status: state.status,
  }));

  if (isLoading) {
    return <LoadingSpin layout="global" theme="secondary" />;
  }

  if (status !== 'authenticated') {
    redirect('/login');
  }

  return children;
};

export default CheckIsLoggedIn;
