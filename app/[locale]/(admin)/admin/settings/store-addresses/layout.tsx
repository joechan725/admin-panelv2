import { unstable_setRequestLocale } from 'next-intl/server';
import StoreAddressRoot from './components/root/StoreAddressRoot';

interface StoreAddressesLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const StoreAddressesLayout = ({ children, params: { locale } }: StoreAddressesLayoutProps) => {
  unstable_setRequestLocale(locale);

  return (
    <>
      <StoreAddressRoot />
      {children}
    </>
  );
};

export default StoreAddressesLayout;
