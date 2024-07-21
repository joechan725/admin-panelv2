import { unstable_setRequestLocale } from 'next-intl/server';
import OrderRoot from '../components/root/OrderRoot';

interface OrderDetailLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const OrderDetailLayout = ({ children, params: { locale } }: OrderDetailLayoutProps) => {
  unstable_setRequestLocale(locale);

  return (
    <>
      <OrderRoot />
      {children}
    </>
  );
};

export default OrderDetailLayout;
