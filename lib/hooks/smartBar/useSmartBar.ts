import { revalidatePublicPage } from '@/actions/revalidate/revalidatePublicPage';
import { addSmartBar, CreateSmartBarFirestoreData } from '@/firebase/api/smartBar/addSmartBar';
import { getSmartBar } from '@/firebase/api/smartBar/getSmartBar';
import { getSmartBars } from '@/firebase/api/smartBar/getSmartBars';
import { updateSmartBar, UpdateSmartBarFirestoreData } from '@/firebase/api/smartBar/updateSmartBar';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { SmartBar } from '@/models/smartBar/SmartBar';
import { SmartBarSchema } from '@/schemas/smartBarSchema';
import { useSessionStore } from '@/stores/useSessionStore';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useToast } from '../toast/useToast';

interface EditSmartBarParameters {
  smartBarId: string;
  smartBarData: SmartBarSchema;
  originalIsPublic: boolean;
}

interface LoadSmartBarsParameters {
  publicOnly: boolean;
}

interface ToggleIsPublicParameters {
  smartBar: SmartBar;
  isPublic: boolean;
  setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RemoveSmartBarParameters {
  smartBarId: string;
  originalIsPublic: boolean;
}

export interface SmartBarIdAndIsPublic {
  smartBarId: string;
  originalIsPublic: boolean;
}

interface RemoveSmartBarsParameters {
  smartBarIdAndIsPublicArray: SmartBarIdAndIsPublic[];
}

export const useSmartBar = () => {
  const [smartBar, setSmartBar] = useState<SmartBar | undefined>(undefined);
  const [smartBars, setSmartBars] = useState<SmartBar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { toastSuccess, toastError } = useToast();

  const { userFireAuthData } = useSessionStore((state) => ({ userFireAuthData: state.userFireAuthData }));

  const loadSmartBars = async ({ publicOnly }: LoadSmartBarsParameters) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const smartBarsData = await getSmartBars({ publicOnly });
      setSmartBars(smartBarsData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSmartBar = async (smartBarId: string) => {
    try {
      const smartBarData = await getSmartBar({ smartBarId });
      setSmartBar(smartBarData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const createSmartBar = async (smartBarData: SmartBarSchema) => {
    setIsWriting(true);
    setError(undefined);
    try {
      const filteredSmartBarData = removeEmptyFieldFormObject(smartBarData);
      const smartBarFirestoreData: CreateSmartBarFirestoreData = {
        ...filteredSmartBarData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await addSmartBar(smartBarFirestoreData);
      if (smartBarData.isPublic) {
        const idTokenResult = await userFireAuthData?.getIdTokenResult();
        revalidatePublicPage({ idTokenResult });
      }
      toastSuccess('created');
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const editSmartBar = async ({ smartBarId, smartBarData, originalIsPublic }: EditSmartBarParameters) => {
    setIsWriting(true);
    setError(undefined);

    try {
      const filteredSmartBarData = removeEmptyFieldFormObject(smartBarData);
      const smartBarFirestoreData: UpdateSmartBarFirestoreData = {
        ...filteredSmartBarData,
        updatedAt: serverTimestamp(),
      };
      await updateSmartBar({ smartBarId, smartBarFirestoreData });
      if (smartBarData.isPublic !== originalIsPublic) {
        const idTokenResult = await userFireAuthData?.getIdTokenResult();
        revalidatePublicPage({ idTokenResult });
      }
      toastSuccess('updated');
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const toggleIsPublic = async ({ isPublic, smartBar, setIsPublic }: ToggleIsPublicParameters) => {
    const prevIsPublic = isPublic;
    setIsWriting(true);
    setError(undefined);
    try {
      setIsPublic((prevIsPublic) => !prevIsPublic);
      const smartBarFirestoreData: UpdateSmartBarFirestoreData = {
        isPublic: !prevIsPublic,
        updatedAt: serverTimestamp(),
      };
      await updateSmartBar({ smartBarId: smartBar.id, smartBarFirestoreData });
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidatePublicPage({ idTokenResult });
      toastSuccess(prevIsPublic ? 'hided' : 'published');
      return true;
    } catch (error) {
      setIsPublic(prevIsPublic);
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const removeSmartBar = async ({ smartBarId, originalIsPublic }: RemoveSmartBarParameters) => {
    setIsWriting(true);
    setError(undefined);
    try {
      const smartBarFirestoreData: UpdateSmartBarFirestoreData = {
        updatedAt: serverTimestamp(),
        deletedAt: serverTimestamp(),
      };
      await updateSmartBar({ smartBarId, smartBarFirestoreData });
      if (originalIsPublic) {
        const idTokenResult = await userFireAuthData?.getIdTokenResult();
        revalidatePublicPage({ idTokenResult });
      }
      toastSuccess('deleted');
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const removeSmartBars = async ({ smartBarIdAndIsPublicArray }: RemoveSmartBarsParameters) => {
    setIsWriting(true);
    setError(undefined);
    try {
      for (let i = 0; i < smartBarIdAndIsPublicArray.length; i++) {
        const smartBarId = smartBarIdAndIsPublicArray[i].smartBarId;
        const smartBarFirestoreData: UpdateSmartBarFirestoreData = {
          updatedAt: serverTimestamp(),
          deletedAt: serverTimestamp(),
        };
        await updateSmartBar({ smartBarId, smartBarFirestoreData });
      }
      const isSomePublic = smartBarIdAndIsPublicArray.some((object) => object.originalIsPublic);
      if (isSomePublic) {
        const idTokenResult = await userFireAuthData?.getIdTokenResult();
        revalidatePublicPage({ idTokenResult });
      }
      toastSuccess('deleted');
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  return {
    smartBar,
    smartBars,
    isLoading,
    isWriting,
    error,
    createSmartBar,
    editSmartBar,
    loadSmartBars,
    loadSmartBar,
    toggleIsPublic,
    removeSmartBar,
    removeSmartBars,
  };
};
