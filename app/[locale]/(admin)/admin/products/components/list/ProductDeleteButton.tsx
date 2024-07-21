'use client';

import BoxButton from '@/components/form/BoxButton';
import Trash from '@/components/icon/Trash';
import IconButton from '@/components/ui/button/IconButton';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { useProduct } from '@/lib/hooks/product/useProduct';
import { PrivateProduct } from '@/models/product/PrivateProduct';
import { AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

interface ProductDeleteButtonProps {
  privateProduct: PrivateProduct;
}

const ProductDeleteButton = ({ privateProduct }: ProductDeleteButtonProps) => {
  const t = useTranslations('Delete');
  const locale = useLocale();

  const { id, nameEN, nameZH } = privateProduct;

  const [isDeleting, setIsDeleting] = useState(false);

  const { isWriting, removeProduct } = useProduct();

  const handleDelete = async () => {
    const res = await removeProduct(id);
    if (res) {
      setIsDeleting(false);
    }
  };

  const name = locale === 'en' ? nameEN : nameZH;

  return (
    <>
      <HoverPopup message={t('delete')}>
        <IconButton type="button" onClick={() => setIsDeleting(true)} disabled={isWriting} theme="danger">
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
              <div className="font-semibold text-primary-text">{t('confirmation', { name: t('product') })}</div>
              <div className="font-medium text-secondary-text">{name}</div>
              <div className="font-bold text-danger">{t('caution')}</div>
            </div>
            <div className="ml-auto max-w-min">
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

export default ProductDeleteButton;
