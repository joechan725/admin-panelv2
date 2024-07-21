'use client';

import clsx from 'clsx/lite';
import { useRef, useState } from 'react';
import { Reorder } from 'framer-motion';
import ImageShow from '../ui/image/ImageShow';
import BoxButton from './BoxButton';
import LoadingShimmer from '../loading/LoadingShimmer';
import ArrowsPointingOut from '../icon/ArrowsPointingOut';
import IconCircleButton from '../ui/button/IconCircleButton';
import { ImageInput } from '@/models/ImageInput';

interface DNDImagesUploaderProps {
  title?: string;
  disabled: boolean;
  sizeClassName?: string;
  images: ImageInput[];
  setImages: React.Dispatch<React.SetStateAction<ImageInput[]>>;
  shape?: 'square' | 'video';
}

const DNDImagesUploader = ({
  title,
  disabled,
  sizeClassName = 'w-full',
  images,
  setImages,
  shape = 'video',
}: DNDImagesUploaderProps) => {
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
    addImages(files);
  };

  const handleChangeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    addImages(files);
  };

  const addImages = (files: FileList | null) => {
    if (!files || files?.length === 0) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] === 'image') {
        setImages((prevImages) => [
          ...prevImages,
          {
            id: crypto.randomUUID(),
            alt: 'user selected object',
            url: URL.createObjectURL(files[i]),
            file: files[i],
          },
        ]);
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((prevImage, prevImageIndex) => prevImageIndex !== index));
  };

  return (
    <>
      {title !== undefined && <div className="text-sm font-semibold text-primary-text mb-2">{title}</div>}
      <div
        className={clsx(
          'relative border hover:cursor-pointer rounded-lg p-8 bg-slate-50/20 flex flex-col justify-center items-center space-y-2 md:space-y-5 z-10',
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
        {isDragging ? (
          <div className="text-safe text-xl font-semibold text-center">Drop images here</div>
        ) : (
          <>
            <div className="text-xl font-semibold text-primary-text text-center">Drag and drop your images here</div>
            <div className="text-sm font-semibold text-primary-text text-center">or</div>
            <BoxButton theme="primary" type="button" disabled={false} fontSize="sm">
              Browse Image
            </BoxButton>
          </>
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
      <Reorder.Group
        axis="x"
        values={images}
        onReorder={setImages}
        className="space-x-2 w-full overflow-x-scroll scrollbar scrollbar-slate whitespace-nowrap"
      >
        {images.map((image, index) => (
          <Reorder.Item value={image} key={crypto.randomUUID()} className="w-60 inline-block relative">
            <div className="relative">
              <ImageShow image={image} sizeClassName="min-w-max" />
              <div
                role="button"
                className="absolute top-0 right-2 text-danger text-3xl hover:text-danger/85 active:text-danger/70"
                onClick={() => handleDeleteImage(index)}
              >
                &times;
              </div>
              <IconCircleButton
                theme="primary"
                className="opacity-70 absolute bottom-2 left-2 hover:scale-105 hover:cursor-move hover:opacity-100"
                type="button"
                disabled={false}
              >
                <ArrowsPointingOut />
              </IconCircleButton>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </>
  );
};

export default DNDImagesUploader;
