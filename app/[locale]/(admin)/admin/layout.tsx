import AdminLayoutComponent from '@/components/layout/AdminLayout';
import { unstable_setRequestLocale } from 'next-intl/server';

interface AdminLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const AdminLayout = ({ children, params: { locale } }: AdminLayoutProps) => {
  unstable_setRequestLocale(locale);

  return <AdminLayoutComponent>{children}</AdminLayoutComponent>;
};

export default AdminLayout;
