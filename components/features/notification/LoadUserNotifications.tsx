'use client';

import { useNotificationStore } from '@/stores/useNotificationStore';
import NotificationFrame from './NotificationFrame';

interface LoadUserNotificationsProps {}
const LoadUserNotifications = ({}: LoadUserNotificationsProps) => {
  const { isLoading, displayNotifications, error, isLastOne, isEmpty, handleViewMore } = useNotificationStore(
    (state) => ({
      isLoading: state.isLoading,
      displayNotifications: state.displayNotifications,
      notificationCount: state.notificationCount,
      error: state.error,
      handleViewMore: state.handleViewMore,
      isLastOne: state.isLastOne,
      isEmpty: state.isEmpty,
    })
  );
  return (
    <NotificationFrame
      displayNotifications={displayNotifications}
      error={error}
      mode="user"
      onViewMore={handleViewMore}
      isEmpty={isEmpty}
      isLastOne={isLastOne}
      isLoading={isLoading}
    />
  );
};
export default LoadUserNotifications;
