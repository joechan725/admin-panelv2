import { useState } from 'react';
import { deleteNotification } from '@/firebase/api/user/notification/deleteNotification';

interface RemoveNotificationParameters {
  userId: string;
  notificationId: string;
}

export const useAdminNotification = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const removeNotification = async ({ userId, notificationId }: RemoveNotificationParameters) => {
    setIsWriting(true);
    setError(null);
    try {
      // delete the notification by given user and notification id
      await deleteNotification({ userId, notificationId });
    } catch (error) {
      // handle the error if any
      setError('unexpectedError');
    } finally {
      setIsWriting(false);
    }
  };

  return {
    isWriting,
    error,
    removeNotification,
  };
};
