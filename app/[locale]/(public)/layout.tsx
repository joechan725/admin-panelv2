import AgeVerificationModal from '@/components/features/AgeVerification/AgeVerificationModal';
import PublicLayoutComponent from '@/components/layout/PublicLayout';
import { unstable_setRequestLocale } from 'next-intl/server';

interface PublicLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const PublicLayout = ({ children, params: { locale } }: PublicLayoutProps) => {
  unstable_setRequestLocale(locale);
  return (
    <>
      <AgeVerificationModal />
      <PublicLayoutComponent>{children}</PublicLayoutComponent>
    </>
  );
};

export default PublicLayout;
