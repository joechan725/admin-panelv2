import { Metadata } from 'next';
import LoadEditUserProfileForm from '../components/form/LoadEditUserProfileForm';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface EditUserDetailProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('editUserProfile'),
  };
};

const EditUserDetail = ({ params: { locale } }: EditUserDetailProps) => {
  unstable_setRequestLocale(locale);

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-screen-md w-full">
        <LoadEditUserProfileForm />
      </div>
    </div>
  );
};

export default EditUserDetail;
