import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config';

export const addImage = async (folder: string, file: File) => {
  // generate the filename by UUID
  const filename = crypto.randomUUID();
  const imageId = filename;

  // get the original file extension
  const extension = file.name.split('.').at(-1);
  const fullFilename = filename + '.' + extension;

  // the fullPath of the image
  const fullPath = folder + '/' + fullFilename;

  // prepare
  const imageRef = ref(storage, fullPath);

  // upload
  const uploadResult = await uploadBytes(imageRef, file);

  // get the uploaded image url
  const imageURL = await getDownloadURL(uploadResult.ref);
  return { imageURL, imageId, fullFilename };
};
