import BoxButton from '@/components/form/BoxButton';
import Trash from '@/components/icon/Trash';
import IconButton from '@/components/ui/button/IconButton';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { useOrder } from '@/lib/hooks/order/useOrder';
import { StatusHistory } from '@/models/order/StatusHistory';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface AdminDeleteStatusHistoryButtonProps {
  statusHistory: StatusHistory;
}

const AdminDeleteStatusHistoryButton = ({ statusHistory }: AdminDeleteStatusHistoryButtonProps) => {
  const t = useTranslations('Delete');

  const [isDeleting, setIsDeleting] = useState(false);
  const params = useParams<{ orderId: string }>();

  const { removeOrderStatusHistory, isWriting } = useOrder();

  const { orderId } = params;

  const { status, id } = statusHistory;

  const handleDelete = async () => {
    const res = await removeOrderStatusHistory({ orderId, statusHistoryId: id });
    if (res) {
      setIsDeleting(false);
    }
  };

  if (
    status !== 'Ready for Pickup' &&
    status !== 'Delivering' &&
    status !== 'Picked Up' &&
    status !== 'Delivered' &&
    status !== 'Refund Request Reject'
  ) {
    return null;
  }

  return (
    <>
      <HoverPopup message={t('delete')} algin="right">
        <IconButton disabled={isWriting} type="button" theme="danger" onClick={() => setIsDeleting(true)}>
          <Trash sizeClassName="size-4" />
        </IconButton>
      </HoverPopup>
      <AnimatePresence>
        {isDeleting && (
          <PopUpModal
            scrollbar
            roundedClassName="rounded-xl"
            sizeClassName="max-w-md w-full"
            className="p-8 space-y-4"
            backdrop
            onClose={() => setIsDeleting(false)}
          >
            <div className="space-y-1">
              <div className="font-semibold text-primary-text">{t('confirmation', { name: t('statusHistory') })}</div>
              <div className="font-medium text-secondary-text">{status}</div>
              <div className="font-bold text-danger">{t('caution')}</div>
            </div>
            <div className="ml-auto max-w-min mt-4">
              <BoxButton onClick={handleDelete} type="button" disabled={isWriting} theme="danger" fontSize="sm">
                {t('confirm')}
              </BoxButton>
            </div>
          </PopUpModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminDeleteStatusHistoryButton;
