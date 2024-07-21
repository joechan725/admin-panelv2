'use client';

import Bell from '@/components/icon/Bell';
import DropDown from '@/components/ui/popup/DropDown';
import { useState } from 'react';
import { useNotificationStore } from '@/stores/useNotificationStore';
import LoadUserNotifications from './LoadUserNotifications';
import IconContainerWithBadgeCount from '@/components/ui/button/IconContainerWithBadgeCount';

interface NotificationButtonProps {}
const NotificationButton = ({}: NotificationButtonProps) => {
  const [isShowNotification, setIsShowNotification] = useState(false);
  const { notificationCount } = useNotificationStore((state) => ({
    notificationCount: state.notificationCount,
  }));

  return (
    <>
      <IconContainerWithBadgeCount
        theme="secondary"
        onClick={() => setIsShowNotification(true)}
        badgeCount={notificationCount}
      >
        <Bell sizeClassName="size-6" />
      </IconContainerWithBadgeCount>
      {isShowNotification && (
        <DropDown
          closeButton
          sizeClassName="max-w-full sm:max-w-96 w-full"
          className="px-4 py-6"
          onClose={() => setIsShowNotification(false)}
          roundedClassName="rounded-md"
          positionClassName="-bottom-2 right-0"
        >
          <LoadUserNotifications />
        </DropDown>
      )}
    </>
  );
};
export default NotificationButton;
