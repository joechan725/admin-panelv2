import { unstable_setRequestLocale } from 'next-intl/server';
import MyAccountSideBar from './components/sidebar/MyAccountSideBar';
import ToggleMyAccountSideBar from './components/sidebar/ToggleMyAccountSideBar';
import PublicPageContainer from '@/components/layout/container/PublicPageContainer';

interface UserLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const UserLayout = ({ children, params: { locale } }: UserLayoutProps) => {
  unstable_setRequestLocale(locale);

  return (
    <PublicPageContainer>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-16">
        <div className="hidden md:block md:col-span-2">
          <MyAccountSideBar />
        </div>
        {/* A button showed when the screen width < md */}
        <ToggleMyAccountSideBar />
        <div className="md:col-span-5">{children}</div>
      </div>
    </PublicPageContainer>
  );
};

export default UserLayout;
