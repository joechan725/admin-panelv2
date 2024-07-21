'use client';

import BoxButton from '@/components/form/BoxButton';
import Trash from '@/components/icon/Trash';
import IconButton from '@/components/ui/button/IconButton';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { useCoupon } from '@/lib/hooks/coupon/useCoupon';
import { PrivateCoupon } from '@/models/coupon/PrivateCoupon';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface CouponDeleteButtonProps {
  privateCoupon: PrivateCoupon;
}
const CouponDeleteButton = ({ privateCoupon }: CouponDeleteButtonProps) => {
  const t = useTranslations('Delete');

  const [isDeleting, setIsDeleting] = useState(false);

  const { isWriting, removeCoupon } = useCoupon();

  const handleDelete = async () => {
    const res = await removeCoupon(privateCoupon.id);
    if (res) {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <HoverPopup message={t('delete')}>
        <IconButton type="button" onClick={() => setIsDeleting(true)} theme="danger" disabled={isWriting}>
          <Trash sizeClassName="size-5" />
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
              <div className="font-semibold text-primary-text">{t('confirmation', { name: t('coupon') })}</div>
              <div className="font-medium text-secondary-text">{privateCoupon.code}</div>
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
export default CouponDeleteButton;
