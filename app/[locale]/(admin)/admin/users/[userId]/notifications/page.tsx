import LoadAdminNotifications from '@/components/features/notification/LoadAdminNotifications';
import Widget from '@/components/layout/container/Widget';
import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface NotificationProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('userNotification'),
  };
};

const Notification = ({ params: { locale } }: NotificationProps) => {
  unstable_setRequestLocale(locale);

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-screen-lg w-full">
        <Widget className="min-h-60">
          <LoadAdminNotifications />
        </Widget>
      </div>
    </div>
  );
};

export default Notification;
