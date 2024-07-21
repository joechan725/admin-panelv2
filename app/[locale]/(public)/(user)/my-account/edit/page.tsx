import { Metadata } from 'next';
import LoadEditProfileForm from '../components/form/LoadEditProfileForm';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface EditProfileProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('editMyProfile'),
  };
};

const EditProfile = ({ params: { locale } }: EditProfileProps) => {
  unstable_setRequestLocale(locale);

  return <LoadEditProfileForm />;
};

export default EditProfile;
