import { revalidateProductsPage } from '@/actions/revalidate/revalidateProductsPage';
import { addCollection, AddCollectionData } from '@/firebase/api/classification/collection/addCollection';
import { getCollection } from '@/firebase/api/classification/collection/getCollection';
import { getCollections } from '@/firebase/api/classification/collection/getCollections';
import { updateCollection, UpdateCollectionData } from '@/firebase/api/classification/collection/updateCollection';
import { addDeleteFieldForEmptyFieldInObject } from '@/lib/helpers/objects/addDeleteFieldForEmptyFieldInObject';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { Collection } from '@/models/classification/collection/Collection';
import { CollectionSchema } from '@/schemas/collectionSchema';
import { useSessionStore } from '@/stores/useSessionStore';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useToast } from '../toast/useToast';

interface CreateCollectionParameters {
  formData: CollectionSchema;
}

interface UpdateCollectionParameters {
  collectionId: string;
  formData: CollectionSchema;
}

export const useCollection = () => {
  const [collection, setCollection] = useState<Collection | undefined>(undefined);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { toastSuccess, toastError } = useToast();

  const { userFireAuthData } = useSessionStore((state) => ({ userFireAuthData: state.userFireAuthData }));

  const loadCollection = async (collectionId: string) => {
    setError(undefined);
    setIsLoading(true);
    try {
      const collectionData = await getCollection(collectionId);
      setCollection(collectionData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCollections = async () => {
    setError(undefined);
    setIsLoading(true);
    try {
      const collectionsData = await getCollections();
      setCollections(collectionsData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const createCollection = async ({ formData }: CreateCollectionParameters) => {
    setError(undefined);
    setIsWriting(true);

    try {
      const collectionData: AddCollectionData = {
        ...formData,
        privateProductCount: 0,
        publicProductCount: 0,
        totalProductCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const filteredCollectionData = removeEmptyFieldFormObject(collectionData);

      await addCollection(filteredCollectionData);
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

  const editCollection = async ({ collectionId, formData }: UpdateCollectionParameters) => {
    setError(undefined);
    setIsWriting(true);

    try {
      const collectionData: UpdateCollectionData = {
        ...formData,
        updatedAt: serverTimestamp(),
      };

      const filteredCollectionData = addDeleteFieldForEmptyFieldInObject(collectionData);

      await updateCollection({ collectionData: filteredCollectionData, collectionId });
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

  const removeCollection = async (collectionId: string) => {
    setError(undefined);
    setIsWriting(true);
    try {
      const collectionData: UpdateCollectionData = {
        updatedAt: serverTimestamp(),
        deletedAt: serverTimestamp(),
      };
      await updateCollection({ collectionData, collectionId });
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

  const removeCollections = async (collectionIds: string[]) => {
    setError(undefined);
    setIsWriting(true);
    try {
      for (let i = 0; i < collectionIds.length; i++) {
        const collectionData: UpdateCollectionData = {
          updatedAt: serverTimestamp(),
          deletedAt: serverTimestamp(),
        };
        await updateCollection({ collectionData, collectionId: collectionIds[i] });
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
    collection,
    collections,
    isLoading,
    isWriting,
    error,
    loadCollection,
    loadCollections,
    createCollection,
    editCollection,
    removeCollection,
    removeCollections,
  };
};
