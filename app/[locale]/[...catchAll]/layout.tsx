import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

interface Params {
  locale: string;
}

interface CatchAllLayoutProps {
  children: React.ReactNode;
  params: Params;
}

const CatchAllLayout = ({ children, params: { locale } }: CatchAllLayoutProps) => {
  unstable_setRequestLocale(locale);
  notFound();
};

export default CatchAllLayout;
