import { unstable_setRequestLocale } from 'next-intl/server';
import CouponRoot from './components/root/CouponRoot';

interface Params {
  locale: string;
}

interface CouponLayoutProps {
  children: React.ReactNode;
  params: Params;
}

const CouponLayout = ({ children, params: { locale } }: CouponLayoutProps) => {
  unstable_setRequestLocale(locale);

  return (
    <>
      <CouponRoot />
      {children}
    </>
  );
};

export default CouponLayout;
