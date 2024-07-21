import {
  UpdateStoreInformationFirestoreData,
  updateStoreInformation,
} from '@/firebase/api/storeInformation/updateStoreInformation';
import { addDeleteFieldForEmptyFieldInObject } from '@/lib/helpers/objects/addDeleteFieldForEmptyFieldInObject';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { StoreInformationSchema } from '@/schemas/storeInformationSchema';
import { getStoreInformation } from '@/firebase/api/storeInformation/getStoreInformation';
import { StoreInformation } from '@/models/store/StoreInformation';
import { revalidatePublicPage } from '@/actions/revalidate/revalidatePublicPage';
import { useSessionStore } from '@/stores/useSessionStore';
import { useToast } from '../toast/useToast';

interface EditStoreInformationParameters {
  formData: StoreInformationSchema;
}

export const useStoreInformation = () => {
  const [storeInformation, setStoreInformation] = useState<StoreInformation | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { toastSuccess, toastError } = useToast();

  const { userFireAuthData } = useSessionStore((state) => ({ userFireAuthData: state.userFireAuthData }));

  const loadStoreInformation = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const storeInformationData = await getStoreInformation();
      setStoreInformation(storeInformationData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const editStoreInformation = async ({ formData }: EditStoreInformationParameters) => {
    setIsWriting(true);
    setError(undefined);

    try {
      // remove the field with empty value
      const filteredStoreInfo = addDeleteFieldForEmptyFieldInObject(formData);

      // copy the data and add timestamp
      const storeInformationFirestoreData: UpdateStoreInformationFirestoreData = {
        ...filteredStoreInfo,
        updatedAt: serverTimestamp(),
      };

      await updateStoreInformation(storeInformationFirestoreData);
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidatePublicPage({ idTokenResult });
      toastSuccess('updated');
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
    } finally {
      setIsWriting(false);
    }
  };

  return { loadStoreInformation, storeInformation, editStoreInformation, isLoading, isWriting, error };
};
