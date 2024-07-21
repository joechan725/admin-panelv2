import { Suspense } from 'react';
import AdminHeader from './AdminHeader';

interface AdminHeaderSuspenseProps {}

const AdminHeaderSuspense = ({}: AdminHeaderSuspenseProps) => {
  return (
    <Suspense>
      <AdminHeader />
    </Suspense>
  );
};

export default AdminHeaderSuspense;
