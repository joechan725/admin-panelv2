import { revalidateProductsPage } from '@/actions/revalidate/revalidateProductsPage';
import { addBrand, AddBrandData } from '@/firebase/api/classification/brand/addBrand';
import { getBrand } from '@/firebase/api/classification/brand/getBrand';
import { getBrands } from '@/firebase/api/classification/brand/getBrands';
import { updateBrand, UpdateBrandData } from '@/firebase/api/classification/brand/updateBrand';
import { addDeleteFieldForEmptyFieldInObject } from '@/lib/helpers/objects/addDeleteFieldForEmptyFieldInObject';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { Brand } from '@/models/classification/brand/Brand';
import { BrandSchema } from '@/schemas/brandSchema';
import { useSessionStore } from '@/stores/useSessionStore';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useToast } from '../toast/useToast';

interface CreateBrandParameters {
  formData: BrandSchema;
}

interface UpdateBrandParameters {
  brandId: string;
  formData: BrandSchema;
}

export const useBrand = () => {
  const [brand, setBrand] = useState<Brand | undefined>(undefined);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { toastSuccess, toastError } = useToast();

  const { userFireAuthData } = useSessionStore((state) => ({ userFireAuthData: state.userFireAuthData }));

  const loadBrand = async (brandId: string) => {
    setError(undefined);
    setIsLoading(true);
    try {
      const brandData = await getBrand(brandId);
      setBrand(brandData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const loadBrands = async () => {
    setError(undefined);
    setIsLoading(true);
    try {
      const brandsData = await getBrands();
      setBrands(brandsData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const createBrand = async ({ formData }: CreateBrandParameters) => {
    setError(undefined);
    setIsWriting(true);

    try {
      const brandData: AddBrandData = {
        ...formData,
        privateProductCount: 0,
        publicProductCount: 0,
        totalProductCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const filteredBrandData = removeEmptyFieldFormObject(brandData);

      await addBrand(filteredBrandData);
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateProductsPage({ idTokenResult, productIds: [] });
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

  const editBrand = async ({ brandId, formData }: UpdateBrandParameters) => {
    setError(undefined);
    setIsWriting(true);

    try {
      const brandData: UpdateBrandData = {
        ...formData,
        updatedAt: serverTimestamp(),
      };

      const filteredBrandData = addDeleteFieldForEmptyFieldInObject(brandData);

      await updateBrand({ brandData: filteredBrandData, brandId });
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateProductsPage({ idTokenResult, productIds: [] });
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

  const removeBrand = async (brandId: string) => {
    setError(undefined);
    setIsWriting(true);
    try {
      const brandData: UpdateBrandData = {
        updatedAt: serverTimestamp(),
        deletedAt: serverTimestamp(),
      };
      await updateBrand({ brandData, brandId });
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateProductsPage({ idTokenResult, productIds: [] });
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

  const removeBrands = async (brandIds: string[]) => {
    setError(undefined);
    setIsWriting(true);
    try {
      for (let i = 0; i < brandIds.length; i++) {
        const brandData: UpdateBrandData = {
          updatedAt: serverTimestamp(),
          deletedAt: serverTimestamp(),
        };
        await updateBrand({ brandData, brandId: brandIds[i] });
      }
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateProductsPage({ idTokenResult, productIds: [] });
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
    brand,
    brands,
    isLoading,
    isWriting,
    error,
    loadBrand,
    loadBrands,
    createBrand,
    editBrand,
    removeBrand,
    removeBrands,
  };
};
