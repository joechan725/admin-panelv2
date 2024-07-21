'use client';

import ImageShow from '@/components/ui/image/ImageShow';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { Image } from '@/models/Image';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface EnlargeImageButtonProps {
  children: React.ReactNode;
  image?: Image;
}

const EnlargeImageButton = ({ children, image }: EnlargeImageButtonProps) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div role="button" onClick={() => setIsShow(true)}>
        {children}
      </div>
      <AnimatePresence>
        {isShow && (
          <PopUpModal
            backdrop
            onClose={() => setIsShow(false)}
            sizeClassName="max-w-min w-full"
            closeButton
            backgroundColorClassName="bg-transparent"
            ring="none"
          >
            <ImageShow image={image} sizeClassName="size-60 sm:size-96" />
          </PopUpModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnlargeImageButton;
