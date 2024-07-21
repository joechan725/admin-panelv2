import { Image as ImageModal } from '@/models/Image';
import clsx from 'clsx/lite';
import Image from 'next/image';
import Photo from '../../icon/Photo';

interface ImageProps extends Omit<ImageModal, 'id'> {
  id?: string;
}

interface ImageShowProps {
  image: ImageProps | null | undefined;
  fallbackText?: string;
  sizeClassName?: string;
  className?: string;
  roundedClassName?: string;
  draggable?: boolean;
}

const ImageShow = ({
  image,
  fallbackText,
  sizeClassName = 'size-96',
  className,
  roundedClassName = 'rounded-md',
  draggable,
}: ImageShowProps) => {
  return (
    <div draggable={draggable} className={clsx('relative', 'aspect-square', sizeClassName, className)}>
      {!image && fallbackText && (
        <div className={clsx('flex justify-center items-center w-full h-full bg-gray-300', roundedClassName)}>
          <div className="max-w-min max-h-min text-gray-600 font-semibold text-[50%]">{fallbackText}</div>
        </div>
      )}
      {!image && !fallbackText && (
        <div className={clsx('flex justify-center items-center w-full h-full bg-gray-300', roundedClassName)}>
          <Photo sizeClassName="w-8/12 aspect-square" className="text-gray-500/50" />
        </div>
      )}
      {image && (
        <Image
          draggable={draggable}
          src={image.url}
          alt={image.alt}
          fill
          className={clsx('object-cover', roundedClassName)}
        />
      )}
    </div>
  );
};

export default ImageShow;
