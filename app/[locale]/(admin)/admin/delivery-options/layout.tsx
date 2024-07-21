import { unstable_setRequestLocale } from 'next-intl/server';
import DeliveryOptionRoot from './components/root/DeliveryOptionRoot';

interface DeliveryOptionLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const DeliveryOptionLayout = ({ children, params: { locale } }: DeliveryOptionLayoutProps) => {
  unstable_setRequestLocale(locale);

  return (
    <>
      <DeliveryOptionRoot />
      {children}
    </>
  );
};

export default DeliveryOptionLayout;
