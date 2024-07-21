'use client';

import { useSessionStore } from '@/stores/useSessionStore';
import { redirect } from '@/navigation';

interface CheckIsLoggedInProps {
  children: React.ReactNode;
}

const CheckIsLoggedIn = ({ children }: CheckIsLoggedInProps) => {
  const { status } = useSessionStore((state) => ({
    status: state.status,
  }));

  if (status === 'authenticated') {
    redirect('/my-account');
  }

  return children;
};

export default CheckIsLoggedIn;
