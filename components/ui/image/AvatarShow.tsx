import User from '@/components/icon/User';
import { Image as ImageModal } from '@/models/Image';
import clsx from 'clsx/lite';
import Image from 'next/image';

interface ImageProps extends Omit<ImageModal, 'id'> {
  id?: string;
}

interface AvatarShowProps {
  image: ImageProps | null | undefined;
  sizeClassName?: string;
  className?: string;
  roundedClassName?: string;
  greenDot?: boolean;
  greenDotSizeClassName?: string;
}

const AvatarShow = ({
  image,
  sizeClassName = 'size-96',
  className,
  roundedClassName = 'rounded-full',
  greenDot,
  greenDotSizeClassName = 'size-2.5',
}: AvatarShowProps) => {
  return (
    <div className={clsx('relative', sizeClassName, className)}>
      {!image && (
        <div className={clsx('relative bg-gray-300/80 overflow-hidden', sizeClassName, className, roundedClassName)}>
          <User display="solid" sizeClassName={sizeClassName} className="translate-y-[10%] text-white" />
        </div>
      )}
      {image && <Image src={image.url} alt={image.alt} fill className={clsx('object-cover', roundedClassName)} />}
      {greenDot && (
        <div className="absolute bottom-0 right-0 bg-white rounded-full">
          <div className={clsx(greenDotSizeClassName, 'm-0.5 bg-green-400 rounded-full')} />
        </div>
      )}
    </div>
  );
};

export default AvatarShow;
