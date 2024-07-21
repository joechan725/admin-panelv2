'use client';

import BoxButton from '@/components/form/BoxButton';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { useBrand } from '@/lib/hooks/classification/useBrand';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface BrandsDeleteButtonProps {
  selectedBrandIds: string[];
  onDelete?: () => void;
}

const BrandsDeleteButton = ({ selectedBrandIds, onDelete }: BrandsDeleteButtonProps) => {
  const t = useTranslations('Delete');

  const [isDeleting, setIsDeleting] = useState(false);

  const { isWriting, removeBrands } = useBrand();

  const handleDelete = async () => {
    const res = await removeBrands(selectedBrandIds);
    if (res) {
      if (onDelete) {
        onDelete();
      }
      setIsDeleting(false);
    }
  };

  return (
    selectedBrandIds.length > 0 && (
      <>
        <div>
          <BoxButton type="button" onClick={() => setIsDeleting(true)} theme="danger" disabled={isWriting}>
            {t('deleteItems', { name: t('brand') })}
          </BoxButton>
        </div>
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
                  {t('confirmationForItems', { itemCount: selectedBrandIds.length, name: t('brand') })}
                </div>
                <div className="font-bold text-danger">{t('caution')}</div>
              </div>
              <div className="ml-auto max-w-min mt-4">
                <BoxButton onClick={handleDelete} type="button" disabled={isWriting} theme="danger">
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

export default BrandsDeleteButton;
