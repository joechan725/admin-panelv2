import { ImageInput } from '@/models/ImageInput';
import { addImage } from './addImage';
import { Image } from '@/models/Image';

export const handleImageUpload = async (
  folder: string,
  imageData?: ImageInput,
  alt?: string
): Promise<Image | undefined> => {
  if (!imageData) {
    return undefined;
  }

  if (imageData.file && imageData.file instanceof File) {
    const { imageId, imageURL } = await addImage(folder, imageData.file);
    return {
      id: imageId,
      url: imageURL,
      alt: alt ?? imageData.alt,
    };
  }
  return {
    id: imageData.id,
    url: imageData.url,
    alt: alt ?? imageData.alt,
  };
};
