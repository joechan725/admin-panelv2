import { revalidateProductsPage } from '@/actions/revalidate/revalidateProductsPage';
import { handleImagesUpload } from '@/firebase/api/image/handleImagesUpload';
import { addProduct, AddProductFirestoreData } from '@/firebase/api/product/addProduct';
import { getProduct } from '@/firebase/api/product/getProduct';
import { getProducts } from '@/firebase/api/product/getProducts';
import {
  updateProductSubscriberList,
  UpdateProductSubscriberListDataToFirestore,
} from '@/firebase/api/product/other/updateProductSubscriberList';
import { updateProduct, UpdateProductFirestoreData } from '@/firebase/api/product/updateProduct';
import { addDeleteFieldForEmptyFieldInObject } from '@/lib/helpers/objects/addDeleteFieldForEmptyFieldInObject';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { ImageInput } from '@/models/ImageInput';
import { PrivateProduct } from '@/models/product/PrivateProduct';
import { Product } from '@/models/product/Product';
import { ProductSchema } from '@/schemas/productSchema';
import { StockSubscriptionSchema } from '@/schemas/stockSubscriptionSchema';
import { useSessionStore } from '@/stores/useSessionStore';
import { arrayUnion, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useToast } from '../toast/useToast';

interface ProductData extends ProductSchema {
  collectionNameEN?: string;
  collectionNameZH?: string;
  categoryNameEN?: string;
  categoryNameZH?: string;
  brandNameEN?: string;
  brandNameZH?: string;
}

interface CreateProductParameters {
  images: ImageInput[];
  detailImages: ImageInput[];
  productData: ProductData;
}

interface EditProductParameters {
  productId: string;
  images: ImageInput[];
  detailImages: ImageInput[];
  productData: ProductData;
}

interface ToggleIsPublicParameters {
  product: Product;
  isPublic: boolean;
  setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SubscribeToStockParameters {
  formData: StockSubscriptionSchema;
  productId: string;
}

export const useProduct = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);
  const [privateProduct, setPrivateProduct] = useState<PrivateProduct | undefined>(undefined);
  const [privateProducts, setPrivateProducts] = useState<PrivateProduct[]>();
  const [error, setError] = useState<string | undefined>(undefined);

  const { toastError, toastSuccess } = useToast();

  const { userFireAuthData, user } = useSessionStore((state) => ({
    userFireAuthData: state.userFireAuthData,
    user: state.user,
  }));

  const loadProduct = async (productId: string) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const productData = await getProduct(productId);
      setPrivateProduct(productData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const loadProducts = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const productsData = await getProducts();
      setPrivateProducts(productsData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async ({ images, detailImages, productData }: CreateProductParameters) => {
    setIsWriting(true);
    setError(undefined);
    try {
      // handling images
      const imagesData = await handleImagesUpload('/images/products', images, productData.nameEN);
      const detailImagesData = await handleImagesUpload('/images/products', detailImages, productData.nameEN);

      // Removing the field which is undefined / undefined / '' / 'N/A'
      const filteredData = removeEmptyFieldFormObject(productData);

      // copy data to productFireStoreData and add the serverTimestamp
      const productFirestoreData: AddProductFirestoreData = {
        ...filteredData,
        images: imagesData,
        detailImages: detailImagesData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const productId = await addProduct(productFirestoreData);
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateProductsPage({ idTokenResult, productIds: [productId] });
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

  const editProduct = async ({ productId, images, detailImages, productData }: EditProductParameters) => {
    try {
      setIsWriting(true);
      setError(undefined);

      // handling images
      const imagesData = await handleImagesUpload('/images/products', images, productData.nameEN);
      const detailImagesData = await handleImagesUpload('/images/products', detailImages, productData.nameEN);

      // Removing the field which is undefined / undefined / ''
      const filteredData = addDeleteFieldForEmptyFieldInObject(productData);

      // copy data to productFireStoreData and add the serverTimestamp
      const productFirestoreData: UpdateProductFirestoreData = {
        ...filteredData,
        images: imagesData,
        detailImages: detailImagesData,
        updatedAt: serverTimestamp(),
      };

      await updateProduct({ productId, productFirestoreData });
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateProductsPage({ idTokenResult, productIds: [productId] });
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

  const toggleIsPublic = async ({ isPublic, product, setIsPublic }: ToggleIsPublicParameters) => {
    const prevIsPublic = isPublic;
    try {
      setIsWriting(true);
      setError(undefined);
      setIsPublic((prevIsPublic) => !prevIsPublic);
      const productFirestoreData = {
        isPublic: !prevIsPublic,
        updatedAt: serverTimestamp(),
      };
      await updateProduct({ productId: product.id, productFirestoreData });
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateProductsPage({ idTokenResult, productIds: [product.id] });
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

  const removeProduct = async (productId: string) => {
    try {
      setIsWriting(true);
      setError(undefined);
      const productFirestoreData: UpdateProductFirestoreData = {
        updatedAt: serverTimestamp(),
        deletedAt: serverTimestamp(),
      };
      await updateProduct({ productId, productFirestoreData });
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateProductsPage({ idTokenResult, productIds: [productId] });
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

  const removeProducts = async (productIds: string[]) => {
    try {
      setIsWriting(true);
      setError(undefined);
      for (let i = 0; i < productIds.length; i++) {
        const productFirestoreData: UpdateProductFirestoreData = {
          updatedAt: serverTimestamp(),
          deletedAt: serverTimestamp(),
        };
        await updateProduct({ productId: productIds[i], productFirestoreData });
      }
      toastSuccess('deleted');
      const idTokenResult = await userFireAuthData?.getIdTokenResult();
      revalidateProductsPage({ idTokenResult, productIds });
      return true;
    } catch (error) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const subscribeToStock = async ({ formData, productId }: SubscribeToStockParameters) => {
    if (!user) {
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    }

    setIsWriting(true);
    setError(undefined);
    const subscriberListData: UpdateProductSubscriberListDataToFirestore = {
      subscribers: arrayUnion({
        email: formData.email,
        userId: user.id,
      }),
      updatedAt: serverTimestamp(),
    };
    try {
      await updateProductSubscriberList({ productId, subscriberListData });
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
    isLoading,
    isWriting,
    error,
    loadProduct,
    privateProduct,
    loadProducts,
    privateProducts,
    createProduct,
    editProduct,
    toggleIsPublic,
    removeProduct,
    removeProducts,
    subscribeToStock,
  };
};
