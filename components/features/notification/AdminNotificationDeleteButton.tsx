import XMark from '@/components/icon/XMark';
import IconButton from '@/components/ui/button/IconButton';
import { useAdminNotification } from '@/lib/hooks/user/admin/notification/useAdminNotification';
import { useParams } from 'next/navigation';

interface AdminNotificationDeleteButtonProps {
  notificationId: string;
}

const AdminNotificationDeleteButton = ({ notificationId }: AdminNotificationDeleteButtonProps) => {
  const params = useParams<{ userId: string }>();
  const { userId } = params;

  const { removeNotification, isWriting } = useAdminNotification();

  const handleRemove = async () => {
    await removeNotification({ userId, notificationId });
  };

  return (
    <IconButton onClick={handleRemove} disabled={isWriting} theme="danger" type="button">
      <XMark sizeClassName="size-4" />
    </IconButton>
  );
};

export default AdminNotificationDeleteButton;
