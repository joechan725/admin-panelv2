import { ImageInput } from '@/models/ImageInput';
import { Image } from '@/models/Image';
import { handleImageUpload } from './handleImageUpload';

export const handleImagesUpload = async (folder: string, imagesData: ImageInput[], alt?: string) => {
  const images: Image[] = [];

  for (let i = 0; i < imagesData.length; i++) {
    const imageData = imagesData[i];
    const image = await handleImageUpload(folder, imageData, alt);
    if (!image) {
      continue;
    }
    images.push(image);
  }

  return images;
};
