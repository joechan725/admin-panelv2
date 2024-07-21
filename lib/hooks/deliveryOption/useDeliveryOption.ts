import { addDeliveryOption, CreateDeliveryOptionFirestoreData } from '@/firebase/api/deliveryOption/addDeliveryOption';
import { getDeliveryOption } from '@/firebase/api/deliveryOption/getDeliveryOption';
import { getDeliveryOptions } from '@/firebase/api/deliveryOption/getDeliveryOptions';
import {
  updateDeliveryOption,
  UpdateDeliveryOptionFirestoreData,
} from '@/firebase/api/deliveryOption/updateDeliveryOption';
import { addDeleteFieldForEmptyFieldInObject } from '@/lib/helpers/objects/addDeleteFieldForEmptyFieldInObject';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { DeliveryOption } from '@/models/deliveryOption/DeliveryOption';
import { DeliveryOptionSchema } from '@/schemas/deliveryOptionSchema';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useToast } from '../toast/useToast';
import { revalidateDeliveryOptionPage } from '@/actions/revalidate/revalidateDeliveryOptionPage';
import { useSessionStore } from '@/stores/useSessionStore';

interface CreateDeliveryOptionParameters {
  deliveryOptionData: DeliveryOptionSchema;
}

interface EditDeliveryOptionParameters {
  deliveryOptionId: string;
  deliveryOptionData: DeliveryOptionSchema;
}

interface ToggleIsPublicParameters {
  deliveryOption: DeliveryOption;
  isPublic: boolean;
  setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ToggleApplyThresholdBeforeCouponsParameters {
  deliveryOption: DeliveryOption;
  applyThresholdBeforeCoupons: boolean;
  setApplyThresholdBeforeCoupons: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoadDeliveryOptionParameters {
  deliveryOptionId: string;
}

interface LoadDeliveryOptionsParameters {
  isPublicOnly: boolean;
}

export const useDeliveryOption = () => {
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption | undefined>(undefined);
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { toastSuccess, toastError } = useToast();

  const { userFireAuthData } = useSessionStore((state) => ({ userFireAuthData: state.userFireAuthData }));

  const loadDeliveryOptions = async ({ isPublicOnly }: LoadDeliveryOptionsParameters) => {
    try {
      setIsLoading(true);
      setError(undefined);
      const deliveryOptionsData = await getDeliveryOptions({ isPublicOnly });
      setDeliveryOptions(deliveryOptionsData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const loadDeliveryOption = async ({ deliveryOptionId }: LoadDeliveryOptionParameters) => {
    try {
      setIsLoading(true);
      setError(undefined);
      const deliveryOptionData = await getDeliveryOption({ deliveryOptionId });
      setDeliveryOption(deliveryOptionData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const createDeliveryOption = async ({ deliveryOptionData }: CreateDeliveryOptionParameters) => {
    try {
      setIsWriting(true);
      setError(undefined);

      // Removing the field which is undefined / null / ''
      const filteredDeliveryOptionData = removeEmptyFieldFormObject(deliveryOptionData);

      // copy data to productFireStoreData and add the serverTimestamp
      const deliveryOptionFirestoreData: CreateDeliveryOptionFirestoreData = {
        ...filteredDeliveryOptionData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // add deliveryOption to firestore
      await addDeliveryOption(deliveryOptionFirestoreData);
      toastSuccess('created');
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateDeliveryOptionPage({ idTokenResult });
      return true;
    } catch (error: unknown | Error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const editDeliveryOption = async ({ deliveryOptionId, deliveryOptionData }: EditDeliveryOptionParameters) => {
    try {
      setIsWriting(true);
      setError(undefined);

      // Removing the field which is undefined / null / ''
      const filteredDeliveryOptionData = addDeleteFieldForEmptyFieldInObject(deliveryOptionData);

      // copy data to productFireStoreData and add the serverTimestamp
      const deliveryOptionFirestoreData: UpdateDeliveryOptionFirestoreData = {
        ...filteredDeliveryOptionData,
        updatedAt: serverTimestamp(),
      };

      // update deliveryOption to firestore
      await updateDeliveryOption({ deliveryOptionId, deliveryOptionFirestoreData });
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateDeliveryOptionPage({ idTokenResult });
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

  const toggleIsPublic = async ({ isPublic, deliveryOption, setIsPublic }: ToggleIsPublicParameters) => {
    const prevIsPublic = isPublic;
    try {
      setIsWriting(true);
      setError(undefined);
      setIsPublic((prevIsPublic) => !prevIsPublic);
      const deliveryOptionFirestoreData: UpdateDeliveryOptionFirestoreData = {
        isPublic: !prevIsPublic,
        updatedAt: serverTimestamp(),
      };
      await updateDeliveryOption({ deliveryOptionId: deliveryOption.id, deliveryOptionFirestoreData });
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateDeliveryOptionPage({ idTokenResult });
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

  const toggleApplyThresholdBeforeCoupons = async ({
    applyThresholdBeforeCoupons,
    deliveryOption,
    setApplyThresholdBeforeCoupons,
  }: ToggleApplyThresholdBeforeCouponsParameters) => {
    const prevApplyThresholdBeforeCoupons = applyThresholdBeforeCoupons;
    setIsWriting(true);
    setError(undefined);
    try {
      setApplyThresholdBeforeCoupons((prevApplyThresholdBeforeCoupons) => !prevApplyThresholdBeforeCoupons);
      const deliveryOptionFirestoreData: UpdateDeliveryOptionFirestoreData = {
        applyThresholdBeforeCoupons: !prevApplyThresholdBeforeCoupons,
        updatedAt: serverTimestamp(),
      };
      await updateDeliveryOption({ deliveryOptionId: deliveryOption.id, deliveryOptionFirestoreData });
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateDeliveryOptionPage({ idTokenResult });
      toastSuccess('updated');
      return true;
    } catch (error) {
      setApplyThresholdBeforeCoupons(prevApplyThresholdBeforeCoupons);
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const removeDeliveryOption = async (deliveryOptionId: string) => {
    setIsWriting(true);
    setError(undefined);
    try {
      const deliveryOptionFirestoreData: UpdateDeliveryOptionFirestoreData = {
        updatedAt: serverTimestamp(),
        deletedAt: serverTimestamp(),
      };
      await updateDeliveryOption({ deliveryOptionId, deliveryOptionFirestoreData });
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateDeliveryOptionPage({ idTokenResult });
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

  const removeDeliveryOptions = async (deliveryOptionIds: string[]) => {
    try {
      setIsWriting(true);
      setError(undefined);
      for (let i = 0; i < deliveryOptionIds.length; i++) {
        const deliveryOptionFirestoreData: UpdateDeliveryOptionFirestoreData = {
          updatedAt: serverTimestamp(),
          deletedAt: serverTimestamp(),
        };
        await updateDeliveryOption({ deliveryOptionId: deliveryOptionIds[i], deliveryOptionFirestoreData });
      }
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateDeliveryOptionPage({ idTokenResult });
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
    deliveryOption,
    deliveryOptions,
    isLoading,
    isWriting,
    error,
    createDeliveryOption,
    editDeliveryOption,
    loadDeliveryOptions,
    loadDeliveryOption,
    toggleIsPublic,
    toggleApplyThresholdBeforeCoupons,
    removeDeliveryOption,
    removeDeliveryOptions,
  };
};
