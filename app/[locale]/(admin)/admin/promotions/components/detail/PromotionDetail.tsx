'use client';

import BlockNoteViewer from '@/components/ui/blocknote/BlockNoteViewer';
import { isOverflow } from '@/lib/helpers/layout/isOverflow';
import { Promotion } from '@/models/promotion/Promotion';
import clsx from 'clsx/lite';
import { useEffect, useRef, useState } from 'react';

interface PromotionDetailProps {
  promotion: Promotion;
}

const PromotionDetail = ({ promotion }: PromotionDetailProps) => {
  const [isShowAllReceivers, setIsShowAllReceivers] = useState(false);
  const [canShowAllReceivers, setCanShowAllReceivers] = useState(false);
  const receiversRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCanShowAllReceivers(isOverflow(receiversRef.current));
  }, []);

  const handleShowAllReceivers = () => {
    setIsShowAllReceivers((prevValue) => {
      if (!canShowAllReceivers) {
        return false;
      }
      return !prevValue;
    });
  };

  const { to, cc, bcc, promoteByEmail, promoteByNotification, subject, html, text } = promotion;

  // Join the receivers
  const toString = to?.join(', ') ?? '';
  const ccString = cc?.join(', ') ?? '';
  const bccString = bcc?.join(', ') ?? '';
  const receiversString = toString + ccString + bccString;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center flex-wrap">
        <div className="text-sm font-semibold text-primary-text">Promoted by:</div>
        {promoteByNotification && (
          <div className="text-xs py-0.5 px-1 rounded-md max-w-min font-medium bg-success/20 text-success">
            Notification
          </div>
        )}
        {promoteByEmail && (
          <div className="text-xs py-0.5 px-1 rounded-md max-w-min font-medium bg-safe/20 text-safe">Email</div>
        )}
      </div>
      <div className="flex gap-2">
        <div className="text-sm font-semibold text-primary-text">Receivers:</div>
        <div className={clsx('w-full', !isShowAllReceivers && 'line-clamp-2 text-ellipsis')}>
          <div
            ref={receiversRef}
            className={clsx('text-sm font-medium text-secondary-text', canShowAllReceivers && 'hover:cursor-pointer')}
            onClick={handleShowAllReceivers}
          >
            {receiversString}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="text-sm font-semibold text-primary-text">Subject:</div>
        <div className="text-sm font-medium text-secondary-text">{subject}</div>
      </div>
      {text !== undefined && <div className="text-sm font-medium text-secondary-text">{text}</div>}
      <BlockNoteViewer html={html} />
    </div>
  );
};

export default PromotionDetail;
