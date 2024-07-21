'use client';

import { useAdminNotificationListListener } from '@/lib/hooks/user/admin/notification/useAdminNotificationListListener';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import NotificationFrame from './NotificationFrame';

interface LoadAdminNotificationsProps {}

const numberToShowPreClick = 10;

const LoadAdminNotifications = ({}: LoadAdminNotificationsProps) => {
  const [numberToShow, setNumberToShow] = useState(numberToShowPreClick);
  const params = useParams<{ userId: string }>();
  const { userId } = params;

  const { notifications, isLoading, error } = useAdminNotificationListListener(userId);

  const displayNotifications = notifications.slice(0, numberToShow);

  const handleViewMore = () => {
    setNumberToShow((prevNumber) => prevNumber + numberToShowPreClick);
  };

  const isLastOne = notifications.length <= displayNotifications.length;
  const isEmpty = notifications.length === 0;

  return (
    <NotificationFrame
      displayNotifications={displayNotifications}
      error={error}
      mode="admin"
      onViewMore={handleViewMore}
      isEmpty={isEmpty}
      isLastOne={isLastOne}
      isLoading={isLoading}
    />
  );
};
export default LoadAdminNotifications;
