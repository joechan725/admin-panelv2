'use client';

import { useSessionStore } from '@/stores/useSessionStore';
import PublicLayout from '@/components/layout/PublicLayout';
import LoadingSpin from '@/components/loading/LoadingSpin';
import NotFound from '@/components/ui/NotFound';

interface CheckIsAdminProps {
  children: React.ReactNode;
}

const CheckIsAdmin = ({ children }: CheckIsAdminProps) => {
  const { isLoading, isAdmin } = useSessionStore((state) => ({
    isLoading: state.isLoading,
    isAdmin: state.isAdmin,
  }));

  if (isLoading) {
    return (
      <PublicLayout>
        <LoadingSpin layout="global" theme="secondary" />
      </PublicLayout>
    );
  }

  if (!isAdmin) {
    return (
      <PublicLayout>
        <NotFound />
      </PublicLayout>
    );
  }

  return children;
};

export default CheckIsAdmin;
