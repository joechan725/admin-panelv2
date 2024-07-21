'use client';

import PopUpRightBar from '@/components/ui/popup/PopUpRightBar';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from '@/navigation';
import { useState } from 'react';
import LoadEditCategoryForm from '../form/LoadEditCategoryForm';

interface EditCategoryModalProps {}

const EditCategoryModal = ({}: EditCategoryModalProps) => {
  const [isShow, setIsShow] = useState(true);
  const router = useRouter();

  const handleBack = () => {
    setIsShow(false);
    setTimeout(() => router.push('/admin/categories'), 300);
  };

  return (
    <AnimatePresence>
      {isShow && (
        <PopUpRightBar
          backdrop
          roundedClassName="rounded-l-lg"
          onClose={handleBack}
          sizeClassName="max-w-2xl w-full h-full"
          className="pt-8 pb-12 px-16"
          closeButton
        >
          <LoadEditCategoryForm onSuccess={handleBack} />
        </PopUpRightBar>
      )}
    </AnimatePresence>
  );
};

export default EditCategoryModal;
