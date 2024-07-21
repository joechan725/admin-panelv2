'use client';

import PopUpRightBar from '@/components/ui/popup/PopUpRightBar';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import CreateCategoryForm from '../form/CreateCategoryForm';
import { useRouter } from '@/navigation';

interface CreateCategoryModalProps {}
const CreateCategoryModal = ({}: CreateCategoryModalProps) => {
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
          <CreateCategoryForm onSuccess={handleBack} />
        </PopUpRightBar>
      )}
    </AnimatePresence>
  );
};
export default CreateCategoryModal;
