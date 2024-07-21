import { db } from '@/firebase/config';
import { notificationListConverter } from '@/firebase/converter/user/notification/notificationListConverter';
import { Notification } from '@/models/user/notification/Notification';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useAdminNotificationListListener = (userId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // prepare
    const notificationListRef = doc(db, `users/${userId}/lists/notificationList`).withConverter(
      notificationListConverter
    );

    // onSnapshot
    const unsubscribe = onSnapshot(
      notificationListRef,
      (snapshot) => {
        const NotificationListData = snapshot.data() ?? [];
        setNotifications(NotificationListData);
        setIsLoading(false);
      },
      (error) => {
        setError('expectedError');
        setIsLoading(false);
      }
    );

    // unsubscribe
    return () => {
      unsubscribe();
    };
  }, [userId]);

  return { notifications, isLoading, error };
};
