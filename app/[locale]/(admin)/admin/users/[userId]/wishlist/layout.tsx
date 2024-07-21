import { unstable_setRequestLocale } from 'next-intl/server';
import WishlistRoot from './components/root/WishlistRoot';

interface WishlistLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}
const WishlistLayout = ({ children, params: { locale } }: WishlistLayoutProps) => {
  unstable_setRequestLocale(locale);

  return (
    <>
      <WishlistRoot />
      {children}
    </>
  );
};
export default WishlistLayout;
