'use client';

import { useNotificationListListener } from '@/lib/hooks/user/user/notification/useNotificationListListener';

interface NotificationListListenerProps {}

const NotificationListListener = ({}: NotificationListListenerProps) => {
  useNotificationListListener();

  return null;
};

export default NotificationListListener;
