import { unstable_setRequestLocale } from 'next-intl/server';
import ToggleUserSideBar from './components/sidebar/ToggleUserSideBar';
import UserSidebar from './components/sidebar/UserSidebar';

interface UserDetailLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const UserDetailLayout = ({ children, params: { locale } }: UserDetailLayoutProps) => {
  unstable_setRequestLocale(locale);

  return (
    <div className="mt-2">
      <div className="grid xl:grid-cols-7 gap-4 xl:gap-16">
        <div className="hidden xl:block xl:col-span-2">
          <UserSidebar />
        </div>
        {/* A button showed when the screen width < xl */}
        <ToggleUserSideBar />
        <div className="md:col-span-5 lg:col-span-1 xl:col-span-5">
          <div className="max-w-screen-lg w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailLayout;
