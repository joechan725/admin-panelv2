import { addDeleteFieldForEmptyFieldInObject } from '@/lib/helpers/objects/addDeleteFieldForEmptyFieldInObject';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { StoreAddressSchema } from '@/schemas/storeAddressSchema';
import { StoreAddress } from '@/models/store/StoreAddress';
import { getStoreAddress } from '@/firebase/api/storeAddress/getStoreAddress';
import { getStoreAddresses } from '@/firebase/api/storeAddress/getStoreAddresses';
import { addStoreAddress, AddStoreAddressFirestoreData } from '@/firebase/api/storeAddress/addStoreAddress';
import { updateStoreAddress, UpdateStoreAddressFirestoreData } from '@/firebase/api/storeAddress/updateStoreAddress';
import { ImageInput } from '@/models/ImageInput';
import { handleImagesUpload } from '@/firebase/api/image/handleImagesUpload';
import { useToast } from '../toast/useToast';

interface CreateStoreAddressParameters {
  images: ImageInput[];
  storeAddressData: StoreAddressSchema;
}

interface EditStoreAddressParameters {
  storeAddressId: string;
  images: ImageInput[];
  storeAddressData: StoreAddressSchema;
}

export const useStoreAddress = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);

  const [storeAddress, setStoreAddress] = useState<StoreAddress | undefined>(undefined);
  const [storeAddresses, setStoreAddresses] = useState<StoreAddress[]>([]);

  const { toastSuccess, toastError } = useToast();

  const loadStoreAddress = async (storeAddressId: string) => {
    setIsLoading(true);
    try {
      const storeAddressData = await getStoreAddress(storeAddressId);
      setStoreAddress(storeAddressData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const loadStoreAddresses = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const storeAddressesData = await getStoreAddresses();
      setStoreAddresses(storeAddressesData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const createStoreAddress = async ({ images, storeAddressData }: CreateStoreAddressParameters) => {
    setIsWriting(true);
    setError(undefined);
    try {
      // handle images
      const imagesData = await handleImagesUpload('/images/store', images, 'Store image');

      const filteredStoreAddress = removeEmptyFieldFormObject(storeAddressData);

      // The created timestamp
      const createdStoreAddress: AddStoreAddressFirestoreData = {
        ...filteredStoreAddress,
        images: imagesData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addStoreAddress(createdStoreAddress);
      toastSuccess('created');
      return true;
    } catch (error) {
      setError('unexpectedError');
      toastError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const editStoreAddress = async ({ images, storeAddressId, storeAddressData }: EditStoreAddressParameters) => {
    setIsWriting(true);
    setError(undefined);

    try {
      // handle images
      const imagesData = await handleImagesUpload('/images/store', images, 'Store image');

      const filteredStoreAddress = addDeleteFieldForEmptyFieldInObject(storeAddressData);

      // The updated timestamp
      const updatedStoreAddress: UpdateStoreAddressFirestoreData = {
        ...filteredStoreAddress,
        images: imagesData,
        updatedAt: serverTimestamp(),
      };

      await updateStoreAddress({ storeAddressId, storeAddressData: updatedStoreAddress });
      toastSuccess('updated');
      return true;
    } catch (error) {
      setError('unexpectedError');
      toastError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const removeStoreAddress = async (storeAddressId: string) => {
    setIsWriting(true);
    setError(undefined);
    try {
      const updatedStoreAddress: UpdateStoreAddressFirestoreData = {
        updatedAt: serverTimestamp(),
        deletedAt: serverTimestamp(),
      };
      await updateStoreAddress({ storeAddressId, storeAddressData: updatedStoreAddress });
      toastSuccess('deleted');
      return true;
    } catch (error) {
      setError('unexpectedError');
      toastError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  return {
    loadStoreAddress,
    storeAddress,
    loadStoreAddresses,
    storeAddresses,
    isLoading,
    isWriting,
    error,
    createStoreAddress,
    editStoreAddress,
    removeStoreAddress,
  };
};
