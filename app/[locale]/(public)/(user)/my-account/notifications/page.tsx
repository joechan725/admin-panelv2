import { Metadata } from 'next';
import LoadUserNotifications from '@/components/features/notification/LoadUserNotifications';
import LightBorder from '@/components/layout/container/LightBorder';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface NotificationsProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('notifications'),
  };
};

const Notifications = ({ params: { locale } }: NotificationsProps) => {
  unstable_setRequestLocale(locale);

  return (
    <LightBorder className="min-h-60 p-6 w-full">
      <LoadUserNotifications />
    </LightBorder>
  );
};

export default Notifications;
