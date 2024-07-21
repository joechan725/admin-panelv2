'use client';

import { usePathname } from '@/navigation';
import NotFound from '@/components/ui/NotFound';
import PublicLayout from '@/components/layout/PublicLayout';
import AdminLayout from '@/components/layout/AdminLayout';

interface NotFoundPageProps {}

const NotFoundPage = ({}: NotFoundPageProps) => {
  const path = usePathname();

  if (path.startsWith('/admin')) {
    return (
      <AdminLayout>
        <NotFound />
      </AdminLayout>
    );
  }

  return (
    <PublicLayout>
      <NotFound />
    </PublicLayout>
  );
};

export default NotFoundPage;
