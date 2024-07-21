import { Metadata } from 'next';
import LoadUserProfile from './components/LoadUserProfile';
import Widget from '@/components/layout/container/Widget';
import { Link } from '@/navigation';
import BoxButton from '@/components/form/BoxButton';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

interface Params {
  locale: string;
  userId: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface UserDetailProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('userProfile'),
  };
};

const UserDetail = ({ params: { locale, userId } }: UserDetailProps) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('MyAccount.myProfile');

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-screen-md w-full">
        <Widget>
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-primary-text">{t('userProfile')}</div>
            <Link href={`/admin/users/${userId}/edit`}>
              <BoxButton disabled={false} theme="primary" type="button" fontSize="sm">
                {t('edit')}
              </BoxButton>
            </Link>
          </div>
          <LoadUserProfile />
        </Widget>
      </div>
    </div>
  );
};

export default UserDetail;
