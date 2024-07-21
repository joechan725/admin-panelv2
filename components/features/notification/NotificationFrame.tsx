import BarButton from '@/components/form/BarButton';
import NotificationSkeleton from './NotificationSkeleton';
import NotificationList from './NotificationList';
import Email from '@/components/icon/Email';
import { Notification } from '@/models/user/notification/Notification';
import { useTranslations } from 'next-intl';

interface NotificationFrameProps {
  isEmpty: boolean;
  isLastOne: boolean;
  isLoading: boolean;
  error?: string;
  displayNotifications: Notification[];
  onViewMore: () => void;
  mode: 'admin' | 'user';
}

const NotificationFrame = ({
  isEmpty,
  isLastOne,
  isLoading,
  error,
  displayNotifications,
  onViewMore,
  mode,
}: NotificationFrameProps) => {
  const t = useTranslations('Notification');

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4 px-2">
        <Email className="text-primary-text" sizeClassName="size-5" />
        <div className="text-primary-text font-semibold text-lg">{t('notifications')}</div>
      </div>
      <hr className="h-0.5 w-full bg-primary-text-primary-text/20" />
      <div className="max-h-96 overflow-scroll scrollbar">
        {isEmpty && !isLoading && !error && (
          <div className="text-sm font-semibold text-primary-text p-2">{t('noNotifications')}</div>
        )}
        {error && <div className="text-danger font-semibold text-sm p-2">{error}</div>}
        <NotificationList notifications={displayNotifications} mode={mode} />
        {isLoading && <NotificationSkeleton />}
        {!isLastOne && !isLoading && (
          <div className="mt-4">
            <BarButton disabled={false} theme="primary" type="button" onClick={onViewMore}>
              {t('viewMore')}
            </BarButton>
          </div>
        )}
        {!isEmpty && isLastOne && (
          <div className="text-sm font-semibold text-primary-text p-2">{t('endOfNotifications')}</div>
        )}
      </div>
    </div>
  );
};

export default NotificationFrame;
