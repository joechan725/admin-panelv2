import { useTranslations } from 'next-intl';

interface NoPermissionProps {}

const NoPermission = ({}: NoPermissionProps) => {
  const t = useTranslations('Error');

  return (
    <div className="w-full h-screen flex justify-center items-center gap-6">
      <div className="text-2xl">403</div>
      <div className="bg-slate-400 w-[1px] h-12" />
      <div className="text-sm">{t('noPermission')}</div>
    </div>
  );
};

export default NoPermission;
