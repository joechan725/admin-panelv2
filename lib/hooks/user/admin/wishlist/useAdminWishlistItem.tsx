import ProductAddToast from '@/components/ui/toast/ProductAddToast';
import { addWishlistItem, AddWishlistItemFirestoreData } from '@/firebase/api/user/wishlistItem/addWishlistItem';
import { deleteWishlistItem } from '@/firebase/api/user/wishlistItem/deleteWishlistItem';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { Product } from '@/models/product/Product';
import { WishlistItem } from '@/models/user/wishlistItem/WishlistItem';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { addCartItem, AddCartItemFirestoreData } from '@/firebase/api/user/cartItem/addCartItem';
import { useToast } from '../../../toast/useToast';
import toast from 'react-hot-toast';

interface AddItemToWishlistParameters {
  userId: string;
  product: Product;
  wishlistItems: WishlistItem[];
}

interface AddItemsToWishlistParameters {
  userId: string;
  newWishlistItems: WishlistItem[];
}

interface RemoveItemFromWishlistParameters {
  userId: string;
  wishlistItemId: string;
}

interface AddItemFromWishlistToCartParameters {
  userId: string;
  wishlistItem: WishlistItem;
}

export const useAdminWishlistItem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { toastSuccess, toastError } = useToast();

  const addItemToWishlist = async ({ userId, product, wishlistItems }: AddItemToWishlistParameters) => {
    const existingWishlistItem = wishlistItems.find((wishlistItem) => wishlistItem.productId === product.id);
    if (existingWishlistItem) {
      toastError(`The product ${product.nameEN} already is your wishlist.`, { position: 'top-right' });
      setError(`The product ${product.nameEN} already is your wishlist.`);
      return;
    }
    setIsWriting(true);
    setError(undefined);
    try {
      // construct the new wishlistItem
      const newWishlistItem: AddWishlistItemFirestoreData = removeEmptyFieldFormObject({
        productId: product.id,
        nameEN: product.nameEN,
        nameZH: product.nameZH,
        image: product.images?.[0],
        markedPrice: product.markedPrice,
        sellingPrice: product.sellingPrice,
        stock: product.stock,
        brandId: product.brandId,
        brandNameZH: product.brandNameEN,
        brandNameEN: product.brandNameZH,
        categoryId: product.categoryId,
        categoryNameZH: product.categoryNameZH,
        categoryNameEN: product.categoryNameEN,
        collectionId: product.collectionId,
        collectionNameEN: product.categoryNameEN,
        collectionNameZH: product.collectionNameZH,
        commentCount: product.commentCount,
        descriptionEN: product.descriptionEN,
        descriptionZH: product.descriptionZH,
        rating: product.rating,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      await addWishlistItem({ userId, newWishlistItem, productId: product.id });
      toast.custom((t) => <ProductAddToast t={t} product={product} addTo="wishlist" />, {
        duration: 2000,
        position: 'top-right',
      });
    } catch (error) {
      toastError('unexpectedError', { position: 'top-right' });
      setError('unexpectedError');
    } finally {
      setIsWriting(false);
    }
  };
  const addItemsToWishlist = async ({ userId, newWishlistItems }: AddItemsToWishlistParameters) => {
    if (newWishlistItems.length === 0) {
      setError('selectProduct');
      return false;
    }

    setIsWriting(true);
    setError(undefined);
    try {
      for (let i = 0; i < newWishlistItems.length; i++) {
        const newWishlistItem = newWishlistItems[i];
        // construct the new wishlistItem
        const newWishlistItemData: AddWishlistItemFirestoreData = {
          ...newWishlistItem,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        await addWishlistItem({ userId, newWishlistItem: newWishlistItemData, productId: newWishlistItem.productId });
      }
      toastSuccess('added');
      return true;
    } catch (error) {
      toastError('unexpectedError', { position: 'top-right' });
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const removeItemFromWishlist = async ({ userId, wishlistItemId }: RemoveItemFromWishlistParameters) => {
    setIsWriting(true);
    setError(undefined);
    try {
      await deleteWishlistItem({ userId, wishlistItemId });
    } catch (error) {
      toastError('unexpectedError', { position: 'top-right' });
      setError('unexpectedError');
    } finally {
      setIsWriting(false);
    }
  };

  const clearError = () => {
    setError(undefined);
  };

  const addItemFromWishlistToCart = async ({ userId, wishlistItem }: AddItemFromWishlistToCartParameters) => {
    const { nameEN, errorMessage } = wishlistItem;
    if (errorMessage) {
      if (errorMessage === 'out of stock') {
        toastError(`The product '${nameEN}' is out of stock. Please check back soon!`, {
          position: 'top-right',
        });
        setError(`The product '${nameEN}' is out of stock. Please check back soon!`);
      }
      if (errorMessage === 'no longer available') {
        toastError(`The product '${nameEN}' is no longer available.`, {
          position: 'top-right',
        });
        setError(`The product '${nameEN}' is no longer available.`);
      }
      return;
    }
    try {
      setError(undefined);
      setIsWriting(true);
      // construct the new cartItem
      const newCartItem: AddCartItemFirestoreData = {
        productId: wishlistItem.id,
        nameEN: wishlistItem.nameEN,
        nameZH: wishlistItem.nameZH,
        image: wishlistItem.image,
        markedPrice: wishlistItem.markedPrice,
        sellingPrice: wishlistItem.sellingPrice,
        stock: wishlistItem.stock,
        brandId: wishlistItem.brandId,
        brandNameZH: wishlistItem.brandNameEN,
        brandNameEN: wishlistItem.brandNameZH,
        categoryId: wishlistItem.categoryId,
        categoryNameZH: wishlistItem.categoryNameZH,
        categoryNameEN: wishlistItem.categoryNameEN,
        collectionId: wishlistItem.collectionId,
        collectionNameEN: wishlistItem.categoryNameEN,
        collectionNameZH: wishlistItem.collectionNameZH,
        commentCount: wishlistItem.commentCount,
        descriptionEN: wishlistItem.descriptionEN,
        descriptionZH: wishlistItem.descriptionZH,
        rating: wishlistItem.rating,
        quantity: 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await addCartItem({ userId, newCartItem, productId: wishlistItem.productId });
      const productForToast = { ...wishlistItem, tags: [], isPublic: true };
      toast.custom((t) => <ProductAddToast t={t} product={productForToast} addTo="cart" />, {
        duration: 2000,
        position: 'top-right',
      });
    } catch (error) {
      toastError('unexpectedError', { position: 'top-right' });
      setError('unexpectedError');
    } finally {
      setIsWriting(true);
    }
  };

  return {
    isLoading,
    isWriting,
    error,
    addItemToWishlist,
    addItemsToWishlist,
    removeItemFromWishlist,
    clearError,
    addItemFromWishlistToCart,
  };
};
