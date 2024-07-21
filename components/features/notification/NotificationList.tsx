import { Notification } from '@/models/user/notification/Notification';
import NotificationItem from './NotificationItem';

interface NotificationListProps {
  notifications: Notification[];
  mode: 'admin' | 'user';
}
const NotificationList = ({ notifications, mode }: NotificationListProps) => {
  return (
    notifications &&
    notifications.length > 0 && (
      <div>
        {notifications.map((notification) => (
          <NotificationItem notification={notification} mode={mode} key={notification.id} />
        ))}
      </div>
    )
  );
};
export default NotificationList;
