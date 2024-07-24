'use client';

import clsx from 'clsx/lite';
import AvatarShow from '@/components/ui/image/AvatarShow';
import ImageShow from '@/components/ui/image/ImageShow';
import { Notification } from '@/models/user/notification/Notification';
import { useRouter } from '@/navigation';
import { useEffect, useState } from 'react';
import UserNotificationDeleteButton from './UserNotificationDeleteButton';
import AdminNotificationDeleteButton from './AdminNotificationDeleteButton';
import BlockNoteViewer from '@/components/ui/blocknote/BlockNoteViewer';
import { useLanguage } from '@/lib/hooks/language/useLanguage';

interface NotificationItemProps {
  notification: Notification;
  mode: 'admin' | 'user';
}

const NotificationItem = ({ notification, mode }: NotificationItemProps) => {
  const { convertPastTimeDescription, convertNotificationDetail } = useLanguage();

  const { id, message, updatedAt, image, imageType, subject, html } = notification;

  const current = new Date();
  const pastTimeDescription = convertPastTimeDescription(current, updatedAt);
  const [displayPastTimeDescription, setDisplayPastTimeDescription] = useState(pastTimeDescription);

  const router = useRouter();

  const { href, content, title } = convertNotificationDetail(notification);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date();
      const pastTimeDescription = convertPastTimeDescription(current, updatedAt);
      setDisplayPastTimeDescription(pastTimeDescription);
    }, 5 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [updatedAt]);

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <div className="flex items-center gap-4 border-b border-gray-600/20">
      <div
        className={clsx('p-2 flex-1 flex items-center hover:bg-gray-400/10 active:bg-gray-400/20', image && 'gap-6')}
        role={href ? 'button' : 'none'}
        onClick={handleClick}
      >
        {image && (
          <div className="flex-0">
            {imageType === 'avatar' && <AvatarShow image={image} sizeClassName="size-12" />}
            {imageType === 'image' && <ImageShow image={image} sizeClassName="size-12" />}
          </div>
        )}
        <div className="flex-1 space-y-1">
          {title !== undefined && <div className="text-sm font-semibold text-primary-text">{title}</div>}
          {subject !== undefined && <div className="text-sm font-semibold text-primary-text">{subject}</div>}
          {content !== undefined && <div className="text-sm font-medium text-secondary-text">{content}</div>}
          {message !== undefined && <div className="text-sm font-medium text-secondary-text">{message}</div>}
          {html !== undefined && (
            <div className="flex gap-0.5">
              <BlockNoteViewer html={html} className="space-x-0.5" />
            </div>
          )}
          <div className="text-xs font-semibold text-primary-text">{displayPastTimeDescription}</div>
        </div>
      </div>
      <div className="flex-0">
        {mode === 'user' && <UserNotificationDeleteButton notificationId={id} />}
        {mode === 'admin' && <AdminNotificationDeleteButton notificationId={id} />}
      </div>
    </div>
  );
};

export default NotificationItem;
