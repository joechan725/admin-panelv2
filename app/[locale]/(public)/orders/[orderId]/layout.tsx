import PublicPageContainer from '@/components/layout/container/PublicPageContainer';
import { unstable_setRequestLocale } from 'next-intl/server';
import OrderRoot from '../components/root/OrderRoot';

interface Params {
  orderId: string;
  locale: string;
}

interface OrderDetailLayoutProps {
  children: React.ReactNode;
  params: Params;
}

const OrderDetailLayout = ({ children, params: { locale } }: OrderDetailLayoutProps) => {
  unstable_setRequestLocale(locale);

  return (
    <>
      <PublicPageContainer>
        <OrderRoot />
        {children}
      </PublicPageContainer>
    </>
  );
};

export default OrderDetailLayout;
