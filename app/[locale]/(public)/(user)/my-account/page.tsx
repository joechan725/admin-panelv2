import { Metadata } from 'next';
import LoadProfile from './components/LoadProfile';
import { Link } from '@/navigation';
import BoxButton from '@/components/form/BoxButton';
import LightBorder from '@/components/layout/container/LightBorder';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface UserProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('myAccount'),
  };
};

const User = ({ params: { locale } }: UserProps) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('MyAccount.myProfile');

  return (
    <LightBorder className="p-6 max-w-screen-md w-full mx-auto">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-primary-text">{t('title')}</div>
        <Link href="/my-account/edit">
          <BoxButton disabled={false} theme="primary" type="button" fontSize="sm">
            {t('edit')}
          </BoxButton>
        </Link>
      </div>
      <LoadProfile />
    </LightBorder>
  );
};

export default User;
