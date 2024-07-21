import { addCoupon, CreateCouponFirestoreData } from '@/firebase/api/coupon/addCoupon';
import { getCoupon } from '@/firebase/api/coupon/getCoupon';
import { getCoupons } from '@/firebase/api/coupon/getCoupons';
import { updateCoupon, UpdateCouponFirestoreData } from '@/firebase/api/coupon/updateCoupon';
import { addDeleteFieldForEmptyFieldInObject } from '@/lib/helpers/objects/addDeleteFieldForEmptyFieldInObject';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { Coupon } from '@/models/coupon/Coupon';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { getCouponByCode } from '@/firebase/api/coupon/getCouponByCode';
import { CouponSchema } from '@/schemas/couponSchema';
import { useToast } from '../toast/useToast';

interface CreateCouponParameters {
  couponData: CouponSchema;
}

interface EditCouponParameters {
  couponId: string;
  couponData: CouponSchema;
  originalCode: string;
}

interface ToggleIsPublicParameters {
  coupon: Coupon;
  isPublic: boolean;
  setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ToggleCanBeUsedTogetherParameters {
  coupon: Coupon;
  canBeUsedTogether: boolean;
  setCanBeUsedTogether: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ToggleRegisteredUserOnlyParameters {
  coupon: Coupon;
  registeredUserOnly: boolean;
  setRegisteredUserOnly: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoadCouponParameters {
  couponId: string;
}

export const useCoupon = () => {
  const [coupon, setCoupon] = useState<Coupon | undefined>(undefined);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { toastSuccess, toastError } = useToast();

  const loadCoupons = async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      const couponsData = await getCoupons();
      setCoupons(couponsData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCoupon = async ({ couponId }: LoadCouponParameters) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const couponData = await getCoupon({ couponId });
      setCoupon(couponData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const createCoupon = async ({ couponData }: CreateCouponParameters) => {
    setIsWriting(true);
    setError(undefined);

    try {
      const existingCoupon = await getCouponByCode({ code: couponData.code });

      if (existingCoupon) {
        toastError(`Coupon code '${couponData.code}' already used. Please try with another code.`);
        setError(`Coupon code '${couponData.code}' already used. Please try with another code.`);
        return false;
      }

      const { startDate, endDate } = couponData;
      // copy data to productFireStoreData and add the serverTimestamp
      const couponFirestoreData: CreateCouponFirestoreData = {
        ...couponData,
        startDate: startDate === '' ? undefined : startDate,
        endDate: endDate === '' ? undefined : endDate,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Removing the field which is undefined / null / ''
      const filteredCouponData = removeEmptyFieldFormObject(couponFirestoreData);

      // add coupon to firestore
      await addCoupon(filteredCouponData);
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

  const editCoupon = async ({ couponId, couponData, originalCode }: EditCouponParameters) => {
    setIsWriting(true);
    setError(undefined);

    try {
      if (couponData.code !== originalCode) {
        const existingCoupon = await getCouponByCode({ code: couponData.code });

        if (existingCoupon) {
          toastError(`Coupon code '${couponData.code}' already used. Please try with another code.`);
          setError(`Coupon code '${couponData.code}' already used. Please try with another code.`);
          return false;
        }
      }

      const { startDate, endDate } = couponData;
      // copy data to couponFireStoreData and add the serverTimestamp
      const couponFirestoreData: UpdateCouponFirestoreData = {
        ...couponData,
        startDate: startDate === '' ? undefined : startDate,
        endDate: endDate === '' ? undefined : endDate,
        updatedAt: serverTimestamp(),
      };

      // Removing the field which is undefined / null / ''
      const filteredCouponData = addDeleteFieldForEmptyFieldInObject(couponFirestoreData);

      // update coupon to firestore
      await updateCoupon({ couponId, couponFirestoreData: filteredCouponData });
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

  const toggleIsPublic = async ({ isPublic, coupon, setIsPublic }: ToggleIsPublicParameters) => {
    const prevIsPublic = isPublic;
    setIsWriting(true);
    setError(undefined);
    setIsPublic((prevIsPublic) => !prevIsPublic);
    try {
      const couponFirestoreData: UpdateCouponFirestoreData = {
        isPublic: !prevIsPublic,
        updatedAt: serverTimestamp(),
      };
      await updateCoupon({ couponId: coupon.id, couponFirestoreData });
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

  const toggleCanBeUsedTogether = async ({
    canBeUsedTogether,
    coupon,
    setCanBeUsedTogether,
  }: ToggleCanBeUsedTogetherParameters) => {
    const prevCanBeUsedTogether = canBeUsedTogether;
    setIsWriting(true);
    setError(undefined);
    setCanBeUsedTogether((prevCanBeUsedTogether) => !prevCanBeUsedTogether);
    try {
      const couponFirestoreData: UpdateCouponFirestoreData = {
        canBeUsedTogether: !prevCanBeUsedTogether,
        updatedAt: serverTimestamp(),
      };
      await updateCoupon({ couponId: coupon.id, couponFirestoreData });
      toastSuccess('updated');
      return true;
    } catch (error) {
      setCanBeUsedTogether(prevCanBeUsedTogether);
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const toggleRegisteredUserOnly = async ({
    registeredUserOnly,
    coupon,
    setRegisteredUserOnly,
  }: ToggleRegisteredUserOnlyParameters) => {
    const prevRegisteredUserOnly = registeredUserOnly;
    setIsWriting(true);
    setError(undefined);
    setRegisteredUserOnly((prevRegisteredUserOnly) => !prevRegisteredUserOnly);
    try {
      const couponFirestoreData: UpdateCouponFirestoreData = {
        registeredUserOnly: !prevRegisteredUserOnly,
        updatedAt: serverTimestamp(),
      };
      await updateCoupon({ couponId: coupon.id, couponFirestoreData });
      toastSuccess('updated');
      return true;
    } catch (error) {
      setRegisteredUserOnly(prevRegisteredUserOnly);
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const removeCoupon = async (couponId: string) => {
    setIsWriting(true);
    setError(undefined);
    try {
      const couponFirestoreData: UpdateCouponFirestoreData = {
        updatedAt: serverTimestamp(),
        deletedAt: serverTimestamp(),
      };
      await updateCoupon({ couponId, couponFirestoreData });
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

  const removeCoupons = async (couponIds: string[]) => {
    setIsWriting(true);
    setError(undefined);

    try {
      for (let i = 0; i < couponIds.length; i++) {
        const couponFirestoreData: UpdateCouponFirestoreData = {
          updatedAt: serverTimestamp(),
          deletedAt: serverTimestamp(),
        };
        await updateCoupon({ couponId: couponIds[i], couponFirestoreData });
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
    coupon,
    coupons,
    isLoading,
    isWriting,
    error,
    createCoupon,
    editCoupon,
    loadCoupons,
    loadCoupon,
    toggleIsPublic,
    toggleCanBeUsedTogether,
    toggleRegisteredUserOnly,
    removeCoupon,
    removeCoupons,
  };
};
