import { Notification } from '@/models/user/notification/Notification';
import { create } from 'zustand';
import { useSessionStore } from './useSessionStore';
import { deleteNotification } from '@/firebase/api/user/notification/deleteNotification';
import toast from 'react-hot-toast';
import NotificationToast from '@/components/ui/toast/NotificationToast';

interface NotificationStore {
  isLoading: boolean;
  isWriting: boolean;
  error: string | undefined;
  notifications: Notification[];
  displayNotifications: Notification[];
  isLastOne: boolean;
  isEmpty: boolean;
  numberToShow: number;
  notificationCount: number;
  visitAt: number;
  handleViewMore: () => void;
  handleJoinNotification: (notificationsData: Notification[]) => void;
  removeNotification: (notificationId: string) => Promise<void>;
}

const numberToShowPreClick = 10;

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  isLoading: true,
  isWriting: false,
  error: undefined,
  notifications: [],
  displayNotifications: [],
  isLastOne: false,
  isEmpty: false,
  numberToShow: numberToShowPreClick,
  notificationCount: 0,
  visitAt: new Date().getTime(),
  handleViewMore: () => {
    const notifications = get().notifications;
    const prevNumberToShow = get().numberToShow;
    const displayNotifications = notifications.slice(0, prevNumberToShow + numberToShowPreClick);
    set({
      displayNotifications,
      numberToShow: prevNumberToShow + numberToShowPreClick,
      isLastOne: prevNumberToShow + numberToShowPreClick >= notifications.length,
      isEmpty: !notifications || notifications.length === 0,
    });
  },
  handleJoinNotification: (notificationsData) => {
    const isLoading = get().isLoading;
    const visitAt = get().visitAt;
    const notifications = get().notifications;
    const numberToShow = get().numberToShow;

    if (!isLoading) {
      // Display the new notifications
      const newNotifications = notificationsData
        // Filter the notifications which is not in the prev state
        .filter((notificationData) => !notifications.some((notification) => notificationData.id === notification.id))
        // Filter the notifications which it is updated after the site visit time
        .filter((notification) => notification.updatedAt > visitAt)
        // Slice the notifications mark sure no too many toasts are rendered
        .slice(0, 3);
      newNotifications.forEach((newNotification) => {
        toast.custom((t) => <NotificationToast notification={newNotification} t={t} />, {
          duration: 4000,
          position: 'bottom-right',
        });
      });
    }

    const displayNotificationsData = notificationsData.slice(0, numberToShow);

    // store the notification in to state
    set({
      notifications: notificationsData,
      displayNotifications: displayNotificationsData,
      notificationCount: notificationsData.length,
      isLoading: false,
      isLastOne: numberToShow >= notificationsData.length,
      isEmpty: !notificationsData || notificationsData.length === 0,
    });
  },
  removeNotification: async (notificationId) => {
    // get the previous state
    const previousNotifications = get().notifications;

    // map the new state
    const newNotifications = previousNotifications.filter((notification) => notification.id !== notificationId);

    // set the new state
    set({
      notifications: newNotifications,
      isWriting: true,
      error: undefined,
    });
    const user = useSessionStore.getState().user;
    if (!user) {
      return;
    }

    // delete the notification by given id
    try {
      await deleteNotification({ userId: user.id, notificationId });
    } catch (error) {
      // if error, set the error state and rollback the original state
      set({
        error: 'Unexpected error. Please try again later.',
        notifications: previousNotifications,
      });
    } finally {
      set({ isWriting: false });
    }
  },
}));
