'use client';

import toast, { Toast } from 'react-hot-toast';
import AvatarShow from '@/components/ui/image/AvatarShow';
import { useRouter } from 'next/navigation';
import { Notification } from '@/models/user/notification/Notification';
import ImageShow from '../image/ImageShow';
import { useEffect, useState } from 'react';
import CustomToast from './CustomToast';
import clsx from 'clsx/lite';
import BlockNoteViewer from '../blocknote/BlockNoteViewer';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/lib/hooks/language/useLanguage';

interface NotificationToastProps {
  notification: Notification;
  t: Toast;
}

const NotificationToast = ({ notification, t }: NotificationToastProps) => {
  const { message, updatedAt, image, imageType, subject, html } = notification;
  const tNotification = useTranslations('Notification');
  const { convertPastTimeDescription, convertNotificationDetail } = useLanguage();

  const current = new Date();
  const pastTimeDescription = convertPastTimeDescription(current, updatedAt);

  const [displayPastTimeDescription, setDisplayPastTimeDescription] = useState(pastTimeDescription);

  const router = useRouter();

  const { href, content, title } = convertNotificationDetail(notification);

  const handleView = () => {
    if (href) {
      router.push(href);
    }
    toast.dismiss(t.id);
  };

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

  return (
    <CustomToast t={t} homePosition="bottom" sizeClassName="max-w-lg w-full sm:min-w-min">
      <div className="flex">
        <div
          className={clsx('flex-1 flex items-center p-4 hover:bg-gray-400/10 active:bg-gray-400/20', image && 'gap-2')}
          role={href ? 'button' : 'none'}
          onClick={handleView}
        >
          {image && (
            <div className="flex-shrink-0">
              {imageType === 'avatar' && <AvatarShow sizeClassName="size-12" image={image} />}
              {imageType === 'image' && <ImageShow sizeClassName="size-12" image={image} />}
            </div>
          )}
          <div className="ml-3 flex-1">
            <div className={clsx('min-w-20 w-full line-clamp-3 text-ellipsis', image ? 'max-w-72' : 'max-w-96')}>
              {title !== undefined && <div className="text-sm font-semibold text-primary-text">{title}</div>}
              {subject !== undefined && <div className="text-sm font-semibold text-primary-text">{subject}</div>}
              {content !== undefined && <div className="text-sm font-medium text-secondary-text">{content}</div>}
              {message !== undefined && <div className="text-sm font-medium text-secondary-text">{message}</div>}
              {html !== undefined && <BlockNoteViewer html={html} className="space-x-0.5" />}
            </div>
            <div className="mt-1 text-xs font-medium text-slate-600 truncate">{displayPastTimeDescription}</div>
          </div>
        </div>
        <div className="flex flex-shrink-0 flex-col md:flex-row border-l justify-center items-center border-gray-200 px-2 md:px-4 gap-4">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-lg flex items-center justify-center text-xs md:text-sm font-medium text-red-500 hover:text-red-500/85 active:text-red-500/70 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {tNotification('close')}
          </button>
        </div>
      </div>
    </CustomToast>
  );
};

export default NotificationToast;
