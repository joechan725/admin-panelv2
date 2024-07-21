import { unstable_setRequestLocale } from 'next-intl/server';
import AddressRoot from './components/root/AddressRoot';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const Layout = ({ children, params: { locale } }: LayoutProps) => {
  unstable_setRequestLocale(locale);

  return (
    <>
      <AddressRoot />
      {children}
    </>
  );
};

export default Layout;
