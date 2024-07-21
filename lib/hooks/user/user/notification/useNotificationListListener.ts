import { db } from '@/firebase/config';
import { notificationListConverter } from '@/firebase/converter/user/notification/notificationListConverter';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { useSessionStore } from '@/stores/useSessionStore';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';

interface UseNotificationListListenerParameters {}

export const useNotificationListListener = () => {
  const { user } = useSessionStore((state) => ({ user: state.user }));
  const { handleJoinNotification } = useNotificationStore((state) => ({
    handleJoinNotification: state.handleJoinNotification,
  }));

  useEffect(() => {
    if (!user) {
      return;
    }
    // prepare
    const notificationListRef = doc(db, `users/${user.id}/lists/notificationList`).withConverter(
      notificationListConverter
    );

    // onSnapshot
    const unsubscribe = onSnapshot(
      notificationListRef,
      (snapshot) => {
        const NotificationListData = snapshot.data() ?? [];
        handleJoinNotification(NotificationListData);
      },
      (error) => {
        useNotificationStore.setState({ error: 'unexpectedError' });
      }
    );

    // unsubscribe
    return () => {
      unsubscribe();
    };
  }, [user]);
};
