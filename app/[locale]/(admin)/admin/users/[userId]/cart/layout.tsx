import { unstable_setRequestLocale } from 'next-intl/server';
import CartRoot from './components/root/CartRoot';

interface Params {
  locale: string;
}

interface CartLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Params;
}

const CartLayout = ({ children, params: { locale } }: CartLayoutProps) => {
  unstable_setRequestLocale(locale);

  return (
    <>
      <CartRoot />
      {children}
    </>
  );
};

export default CartLayout;
