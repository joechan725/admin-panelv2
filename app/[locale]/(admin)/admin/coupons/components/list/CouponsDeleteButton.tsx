'use client';

import BoxButton from '@/components/form/BoxButton';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { useCoupon } from '@/lib/hooks/coupon/useCoupon';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface CouponDeleteButtonProps {
  selectedCouponIds: string[];
  onDelete?: () => void;
}
const CouponsDeleteButton = ({ selectedCouponIds, onDelete }: CouponDeleteButtonProps) => {
  const t = useTranslations('Delete');

  const [isDeleting, setIsDeleting] = useState(false);

  const { isWriting, removeCoupons } = useCoupon();

  const handleDelete = async () => {
    const res = await removeCoupons(selectedCouponIds);
    if (res) {
      if (onDelete) {
        onDelete();
      }
      setIsDeleting(false);
    }
  };

  return (
    selectedCouponIds.length > 0 && (
      <>
        <BoxButton type="button" onClick={() => setIsDeleting(true)} disabled={isWriting} theme="danger">
          {t('deleteItems', { name: t('coupon') })}
        </BoxButton>
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
                <div className="font-semibold text-primary-text">
                  {t('confirmationForItems', { name: t('coupon'), itemCount: selectedCouponIds.length })}
                </div>
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
    )
  );
};
export default CouponsDeleteButton;
