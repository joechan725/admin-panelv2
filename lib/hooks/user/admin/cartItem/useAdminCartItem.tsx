import ProductAddToast from '@/components/ui/toast/ProductAddToast';
import { addCartItem, AddCartItemFirestoreData } from '@/firebase/api/user/cartItem/addCartItem';
import { deleteCartItem } from '@/firebase/api/user/cartItem/deleteCartItem';
import { updateCartItemQuantity } from '@/firebase/api/user/cartItem/updateCartItemQuantity';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { Product } from '@/models/product/Product';
import { CartItem } from '@/models/user/cartItem/CartItem';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { addWishlistItem, AddWishlistItemFirestoreData } from '@/firebase/api/user/wishlistItem/addWishlistItem';
import { useToast } from '../../../toast/useToast';
import toast from 'react-hot-toast';

interface AddItemToCartParameters {
  userId: string;
  product: Product;
  cartItems: CartItem[];
  quantity?: number;
}

interface AddItemToCartsParameters {
  userId: string;
  newCartItems: CartItem[];
}

interface RemoveItemFromCartParameters {
  userId: string;
  cartItemId: string;
}

interface IncrementItemParameters {
  userId: string;
  cartItemId: string;
  existingQuantity: number;
  incrementQuantity?: number;
}

interface DecrementItemParameters {
  userId: string;
  cartItemId: string;
  existingQuantity: number;
  decrementQuantity?: number;
}

interface ChangeQuantityParameters {
  userId: string;
  cartItemId: string;
  quantity: number;
  existingQuantity: number;
}

interface MoveCartItemToWishListParameters {
  cartItem: CartItem;
  userId: string;
}

export const useAdminCartItem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { toastSuccess, toastError } = useToast();

  const addItemToCart = async ({ userId, product, cartItems, quantity = 1 }: AddItemToCartParameters) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.productId === product.id);
    if (existingCartItem) {
      await incrementItem({
        userId,
        cartItemId: existingCartItem.id,
        existingQuantity: existingCartItem.quantity,
        incrementQuantity: quantity,
      });
      toast.custom((t) => <ProductAddToast t={t} product={product} addTo="cart" />, {
        duration: 2000,
        position: 'top-right',
      });
      return;
    }
    setIsWriting(true);
    setError(undefined);
    try {
      // construct the new cartItem
      const newCartItem: AddCartItemFirestoreData = removeEmptyFieldFormObject({
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
        quantity,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      await addCartItem({ userId, newCartItem, productId: product.id });
      toast.custom((t) => <ProductAddToast t={t} product={product} addTo="cart" />, {
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
  const addItemsToCart = async ({ userId, newCartItems }: AddItemToCartsParameters) => {
    if (newCartItems.length === 0) {
      setError('No product selected');
      return false;
    }

    setIsWriting(true);
    setError(undefined);
    try {
      for (let i = 0; i < newCartItems.length; i++) {
        const newCartItem = newCartItems[i];
        // construct the new cartItem
        const newCartItemData: AddCartItemFirestoreData = removeEmptyFieldFormObject({
          ...newCartItem,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        await addCartItem({ userId, newCartItem: newCartItemData, productId: newCartItem.productId });
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

  const removeItemFromCart = async ({ userId, cartItemId }: RemoveItemFromCartParameters) => {
    setIsWriting(true);
    setError(undefined);
    try {
      await deleteCartItem({ userId, cartItemId });
    } catch (error) {
      toastError('unexpectedError', { position: 'top-right' });
      setError('unexpectedError');
    } finally {
      setIsWriting(false);
    }
  };
  const incrementItem = async ({
    userId,
    cartItemId,
    existingQuantity,
    incrementQuantity = 1,
  }: IncrementItemParameters) => {
    const newQuantity = existingQuantity + incrementQuantity;
    setIsWriting(true);
    setError(undefined);
    try {
      await updateCartItemQuantity({ userId, quantity: newQuantity, cartItemId });
    } catch (error) {
      toastError('unexpectedError', { position: 'top-right' });
      setError('unexpectedError');
    } finally {
      setIsWriting(false);
    }
  };

  const decrementItem = async ({
    userId,
    cartItemId,
    existingQuantity,
    decrementQuantity = 1,
  }: DecrementItemParameters) => {
    const newQuantity = existingQuantity - decrementQuantity;
    if (newQuantity === 0) {
      removeItemFromCart({ userId, cartItemId });
      return;
    }
    setIsWriting(true);
    setError(undefined);
    try {
      await updateCartItemQuantity({ userId, quantity: newQuantity, cartItemId });
    } catch (error) {
      toastError('unexpectedError', { position: 'top-right' });
      setError('unexpectedError');
    } finally {
      setIsWriting(false);
    }
  };
  const changeQuantity = async ({ userId, cartItemId, quantity, existingQuantity }: ChangeQuantityParameters) => {
    if (existingQuantity === quantity) {
      return;
    }
    if (quantity === 0) {
      removeItemFromCart({ userId, cartItemId });
      return;
    }
    setIsWriting(true);
    setError(undefined);
    try {
      await updateCartItemQuantity({ userId, quantity, cartItemId });
    } catch (error) {
      toastError('unexpectedError', { position: 'top-right' });
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const moveCartItemToWishList = async ({ cartItem, userId }: MoveCartItemToWishListParameters) => {
    const { id } = cartItem;
    setIsWriting(true);
    setError(undefined);
    try {
      await removeItemFromCart({ userId, cartItemId: id });
      // construct the new wishlistItem
      const newWishlistItem: AddWishlistItemFirestoreData = {
        productId: cartItem.id,
        nameEN: cartItem.nameEN,
        nameZH: cartItem.nameZH,
        image: cartItem.image,
        markedPrice: cartItem.markedPrice,
        sellingPrice: cartItem.sellingPrice,
        stock: cartItem.stock,
        brandId: cartItem.brandId,
        brandNameZH: cartItem.brandNameEN,
        brandNameEN: cartItem.brandNameZH,
        categoryId: cartItem.categoryId,
        categoryNameZH: cartItem.categoryNameZH,
        categoryNameEN: cartItem.categoryNameEN,
        collectionId: cartItem.collectionId,
        collectionNameEN: cartItem.categoryNameEN,
        collectionNameZH: cartItem.collectionNameZH,
        commentCount: cartItem.commentCount,
        descriptionEN: cartItem.descriptionEN,
        descriptionZH: cartItem.descriptionZH,
        rating: cartItem.rating,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await addWishlistItem({ userId, newWishlistItem, productId: cartItem.productId });
      const productForToast = { ...cartItem, isPublic: true, tags: [] };
      toast.custom((t) => <ProductAddToast t={t} product={productForToast} addTo="wishlist" />, {
        duration: 2000,
        position: 'top-right',
      });
    } catch (error) {
      toastError('unexpectedError', { position: 'top-right' });
      setError('unexpectedError');
      return;
    } finally {
      setIsWriting(false);
    }
  };

  const clearError = () => {
    setError(undefined);
  };

  return {
    isLoading,
    isWriting,
    error,
    addItemToCart,
    addItemsToCart,
    removeItemFromCart,
    incrementItem,
    decrementItem,
    changeQuantity,
    clearError,
    moveCartItemToWishList,
  };
};
