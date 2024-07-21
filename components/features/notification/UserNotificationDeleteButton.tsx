import XMark from '@/components/icon/XMark';
import IconButton from '@/components/ui/button/IconButton';
import { useNotificationStore } from '@/stores/useNotificationStore';

interface UserNotificationDeleteButtonProps {
  notificationId: string;
}

const UserNotificationDeleteButton = ({ notificationId }: UserNotificationDeleteButtonProps) => {
  const { removeNotification, isWriting } = useNotificationStore((state) => ({
    removeNotification: state.removeNotification,
    isWriting: state.isWriting,
  }));

  const handleDelete = () => {
    removeNotification(notificationId);
  };

  return (
    <IconButton onClick={handleDelete} disabled={isWriting} theme="danger" type="button">
      <XMark sizeClassName="size-4" />
    </IconButton>
  );
};

export default UserNotificationDeleteButton;
