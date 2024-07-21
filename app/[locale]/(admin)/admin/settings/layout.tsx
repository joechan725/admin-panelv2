import { unstable_setRequestLocale } from 'next-intl/server';
import SettingSideBar from './components/settingSideBar/SettingSideBar';
import ToggleSettingSideBar from './components/settingSideBar/ToggleSettingSideBar';
import { useTranslations } from 'next-intl';

interface SettingLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const SettingLayout = ({ children, params: { locale } }: SettingLayoutProps) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Admin.setting');

  return (
    <div>
      <div className="flex gap-2 items-center">
        {/* A button showed when the screen width < xl */}
        <ToggleSettingSideBar />
        <h2 className="ml-2 text-2xl text-slate-700 font-semibold">{t('title')}</h2>
      </div>
      <div className="mt-4 grid xl:grid-cols-7 gap-4 xl:gap-16">
        <div className="hidden xl:block xl:col-span-2">
          <SettingSideBar />
        </div>
        <div className="md:col-span-5 lg:col-span-1 xl:col-span-5">
          <div className="max-w-screen-md mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingLayout;
