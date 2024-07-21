'use client';

import BoxButton from '@/components/form/BoxButton';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { useProduct } from '@/lib/hooks/product/useProduct';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface ProductsDeleteButtonProps {
  selectedProductIds: string[];
  onDelete?: () => void;
}

const ProductsDeleteButton = ({ selectedProductIds, onDelete }: ProductsDeleteButtonProps) => {
  const t = useTranslations('Delete');

  const [isDeleting, setIsDeleting] = useState(false);

  const { isWriting, removeProducts } = useProduct();

  const handleDelete = async () => {
    const res = await removeProducts(selectedProductIds);
    if (res) {
      setIsDeleting(false);
      if (onDelete) {
        onDelete();
      }
    }
  };

  return (
    selectedProductIds.length > 0 && (
      <>
        <div>
          <BoxButton type="button" onClick={() => setIsDeleting(true)} theme="danger" disabled={isWriting}>
            {t('deleteItems', { name: t('product') })}
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
                  {t('confirmationForItems', { name: t('product'), itemCount: selectedProductIds.length })}
                </div>
                <div className="text-danger font-bold">{t('caution')}</div>
              </div>
              <div className="ml-auto max-w-min">
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

export default ProductsDeleteButton;
