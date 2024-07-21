import { unstable_setRequestLocale } from 'next-intl/server';
import CommentRoot from './components/root/CommentRoot';

interface CommentLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const CommentLayout = ({ children, params: { locale } }: CommentLayoutProps) => {
  unstable_setRequestLocale(locale);

  return (
    <>
      <CommentRoot />
      {children}
    </>
  );
};

export default CommentLayout;
