'use client';

import { Image as ImageModal } from '@/models/Image';
import ImageShow from './ImageShow';
import { useState } from 'react';
import clsx from 'clsx/lite';

interface ImagesSlideProps {
  images: ImageModal[] | null | undefined;
  sizeClassName?: string;
  className?: string;
  roundedClassName?: string;
}

const ImagesSlide = ({
  images,
  sizeClassName = 'max-w-full w-full',
  className,
  roundedClassName = 'rounded-md',
}: ImagesSlideProps) => {
  const [showImageIndex, setShowImageIndex] = useState(0);

  return (
    <div className={clsx(sizeClassName, className, 'space-y-4 ')}>
      <ImageShow
        image={images?.[showImageIndex] ?? images?.[0]}
        sizeClassName="w-full aspect-square"
        roundedClassName={roundedClassName}
      />
      <div className="flex gap-2 w-full pb-1 min-h-max overflow-x-auto scrollbar scrollbar-slate">
        {images?.map((image, index) => (
          <div key={image.id} role="button" onClick={() => setShowImageIndex(index)}>
            <ImageShow image={image} sizeClassName="size-20" roundedClassName="rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesSlide;
