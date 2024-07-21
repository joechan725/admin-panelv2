'use client';

import Image from 'next/image';
import Edit from '../icon/Edit';
import { ImageInput as ImageInputModel } from '@/models/ImageInput';
import clsx from 'clsx/lite';
import { useRef } from 'react';

interface ImageInput {
  image?: ImageInputModel | undefined;
  setImage: React.Dispatch<React.SetStateAction<ImageInputModel | undefined>>;
  sizeClassName?: string;
  fallbackText?: string;
  disabled?: boolean;
}

const ImageInput = ({
  image,
  setImage,
  sizeClassName = 'size-60',
  fallbackText = 'Pick a image',
  disabled = false,
}: ImageInput) => {
  let url = '';
  let alt = '';
  if (image) {
    // check if image is Flie of not:
    // https://stackoverflow.com/a/60461693
    if (image instanceof File) {
      url = URL.createObjectURL(image);
      alt = '';
    } else {
      url = image.url;
      alt = image.alt;
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined;

    if (!file || file.type.split('/')[0] !== 'image') {
      setImage(undefined);
      return;
    }

    setImage({
      id: crypto.randomUUID(),
      alt: 'shop logo',
      url: URL.createObjectURL(file),
      file,
    });
  };
  //

  return (
    <div className={sizeClassName}>
      <label id="image" className={clsx(disabled ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer')}>
        <div
          className={clsx(sizeClassName, 'relative group border-dashed border-slate-500', disabled && 'animate-pulse')}
        >
          {!image && (
            <div className="size-full flex justify-center items-center rounded-xl bg-slate-100">
              <div className="text-slate-500 text-center m-1">{fallbackText}</div>
            </div>
          )}
          {image && (
            <Image
              src={url}
              alt={alt}
              fill
              style={{ objectFit: 'cover' }}
              className={clsx('rounded-xl', disabled && 'blur-[2px] animate-pulse')}
            />
          )}
          {!disabled && (
            <Edit
              sizeClassName="size-8"
              className="bg-gray-50 text-gray-700 rounded-lg opacity-70 absolute bottom-1 right-1 hidden group-hover:block"
            />
          )}
        </div>
        <input disabled={disabled} className="hidden" type="file" accept="image" onChange={handleChange} />
      </label>
    </div>
  );
};

export default ImageInput;
