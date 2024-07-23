'use client';

import clsx from 'clsx/lite';
import { useRef, useState } from 'react';
import BoxButton from './BoxButton';
import LoadingShimmer from '../loading/LoadingShimmer';
import Image from 'next/image';
import Edit from '../icon/Edit';
import { ImageInput } from '@/models/ImageInput';
import { useTranslations } from 'next-intl';

interface DNDImageUploaderProps {
  title?: string;
  disabled: boolean;
  sizeClassName?: string;
  image: ImageInput | undefined;
  setImage: React.Dispatch<React.SetStateAction<ImageInput | undefined>>;
  shape?: 'square' | 'video';
}

const DNDImageUploader = ({
  title,
  disabled,
  sizeClassName = 'w-full',
  image,
  setImage,
  shape = 'video',
}: DNDImageUploaderProps) => {
  const t = useTranslations('ImageUpload');

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectFiles = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = 'copy';
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    addImage(files);
  };

  const handleChangeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    addImage(files);
  };

  const addImage = (files: FileList | null) => {
    const file = files ? files[0] : undefined;

    if (file?.type.split('/')[0] !== 'image') {
      return;
    }

    if (!file) {
      setImage(undefined);
      return;
    }

    setImage({
      id: crypto.randomUUID(),
      alt: 'user selected object',
      url: URL.createObjectURL(file),
      file: file,
    });
  };

  return (
    <div>
      {title !== undefined && <div className="text-sm font-semibold text-primary-text mb-2">{title}</div>}
      <div
        className={clsx(
          'relative border hover:cursor-pointer rounded-lg p-8 bg-slate-50/20 flex flex-col justify-center items-center space-y-2 md:space-y-5 z-10 group',
          isDragging ? 'border-safe ring-2 ring-safe/50' : 'border-dashed border-slate-500',
          shape === 'video' && 'aspect-video',
          shape === 'square' && 'aspect-square',
          sizeClassName
        )}
        onClick={handleSelectFiles}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {disabled && <LoadingShimmer gradient="stone" roundedClassName="rounded-lg" />}
        {image && <Image alt={image.alt} src={image.url} fill className="object-contain" />}
        {!disabled && image && (
          <Edit
            sizeClassName="size-8"
            className="bg-gray-50 text-gray-700 rounded-lg opacity-70 absolute bottom-1 right-1 hidden group-hover:block"
          />
        )}

        {!image && isDragging ? (
          <div className="text-base md:text-xl font-semibold text-safe text-center">{t('dropImageHere')}</div>
        ) : (
          !image && (
            <>
              <div className="text-base md:text-xl font-semibold text-primary-text text-center">
                {t('dragAndDropYourImageHere')}
              </div>
              <div className="text-sm font-semibold text-primary-text text-center">{t('or')}</div>
              <BoxButton theme="primary" type="button" disabled={false} fontSize="sm">
                {t('browseImage')}
              </BoxButton>
            </>
          )
        )}
        <input
          type="file"
          className="hidden"
          accept="image"
          multiple
          ref={fileInputRef}
          onChange={handleChangeFiles}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default DNDImageUploader;
