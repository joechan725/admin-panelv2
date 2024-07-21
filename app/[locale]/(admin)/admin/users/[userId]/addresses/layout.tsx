import { unstable_setRequestLocale } from 'next-intl/server';
import AddressRoot from './components/root/AddressRoot';

interface Params {
  locale: string;
}

interface AddressesLayoutProps {
  children: React.ReactNode;
  params: Params;
}

const AddressesLayout = ({ children, params: { locale } }: AddressesLayoutProps) => {
  unstable_setRequestLocale(locale);

  return (
    <>
      <AddressRoot />
      {children}
    </>
  );
};

export default AddressesLayout;
