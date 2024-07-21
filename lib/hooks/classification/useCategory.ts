import { addCategory, AddCategoryData } from '@/firebase/api/classification/category/addCategory';
import { getCategory } from '@/firebase/api/classification/category/getCategory';
import { getCategories } from '@/firebase/api/classification/category/getCategories';
import { updateCategory, UpdateCategoryData } from '@/firebase/api/classification/category/updateCategory';
import { addDeleteFieldForEmptyFieldInObject } from '@/lib/helpers/objects/addDeleteFieldForEmptyFieldInObject';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { Category } from '@/models/classification/category/Category';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { revalidateProductPageById } from '@/actions/revalidate/revalidateProductPageById';
import { useSessionStore } from '@/stores/useSessionStore';
import { CategorySchema } from '@/schemas/categorySchema';
import { useToast } from '../toast/useToast';

interface CreateCategoryParameters {
  formData: CategorySchema;
}

interface UpdateCategoryParameters {
  categoryId: string;
  formData: CategorySchema;
}

export const useCategory = () => {
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { toastSuccess, toastError } = useToast();

  const { userFireAuthData } = useSessionStore((state) => ({ userFireAuthData: state.userFireAuthData }));

  const loadCategory = async (categoryId: string) => {
    setError(undefined);
    setIsLoading(true);
    try {
      const categoryData = await getCategory(categoryId);
      setCategory(categoryData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    setError(undefined);
    setIsLoading(true);
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async ({ formData }: CreateCategoryParameters) => {
    setError(undefined);
    setIsWriting(true);

    try {
      const categoryData: AddCategoryData = {
        ...formData,
        privateProductCount: 0,
        publicProductCount: 0,
        totalProductCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const filteredCategoryData = removeEmptyFieldFormObject(categoryData);

      await addCategory(filteredCategoryData);
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateProductPageById({ idTokenResult, productIds: [] });
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

  const editCategory = async ({ categoryId, formData }: UpdateCategoryParameters) => {
    setError(undefined);
    setIsWriting(true);

    try {
      const categoryData: UpdateCategoryData = {
        ...formData,
        updatedAt: serverTimestamp(),
      };

      const filteredCategoryData = addDeleteFieldForEmptyFieldInObject(categoryData);

      await updateCategory({ categoryData: filteredCategoryData, categoryId });
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateProductPageById({ idTokenResult, productIds: [] });
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

  const removeCategory = async (categoryId: string) => {
    setError(undefined);
    setIsWriting(true);
    try {
      const categoryData: UpdateCategoryData = {
        updatedAt: serverTimestamp(),
        deletedAt: serverTimestamp(),
      };
      await updateCategory({ categoryData, categoryId });
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateProductPageById({ idTokenResult, productIds: [] });
      toastSuccess('deleted');
      return true;
    } catch (error) {
      toastError(`unexpectedError`);
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const removeCategories = async (categoryIds: string[]) => {
    setError(undefined);
    setIsWriting(true);
    try {
      for (let i = 0; i < categoryIds.length; i++) {
        const categoryData: UpdateCategoryData = {
          updatedAt: serverTimestamp(),
          deletedAt: serverTimestamp(),
        };
        await updateCategory({ categoryData, categoryId: categoryIds[i] });
      }
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateProductPageById({ idTokenResult, productIds: [] });
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
    category,
    categories,
    isLoading,
    isWriting,
    error,
    loadCategory,
    loadCategories,
    createCategory,
    editCategory,
    removeCategory,
    removeCategories,
  };
};
