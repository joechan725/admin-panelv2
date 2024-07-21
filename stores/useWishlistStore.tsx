import { create } from 'zustand';
import { serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import ProductAddToast from '@/components/ui/toast/ProductAddToast';
import { auth } from '@/firebase/config';
import { Product } from '@/models/product/Product';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { WishlistItem } from '@/models/user/wishlistItem/WishlistItem';
import { useCartStore } from './useCartStore';
import { addWishlistItem, AddWishlistItemFirestoreData } from '@/firebase/api/user/wishlistItem/addWishlistItem';
import { deleteWishlistItem } from '@/firebase/api/user/wishlistItem/deleteWishlistItem';
import ToastErrorMessage from '@/components/ui/toast/ToastErrorMessage';

interface WishlistStore {
  isLoading: boolean;
  isWriting: boolean;
  loadingError: string | undefined;
  writingError: string | undefined;
  wishlistItems: WishlistItem[];
  clearWritingError: () => void;
  loadWishlist: (wishlistItems: WishlistItem[]) => void;
  addItemToWishlist: (product: Product) => Promise<boolean>;
  removeItemFromWishlist: (wishlistItemId: string) => Promise<void>;
  addItemFromWishlistToCart: (wishlistItemId: string) => Promise<void>;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  isLoading: true,
  isWriting: false,
  loadingError: undefined,
  writingError: undefined,
  wishlistItems: [],
  clearWritingError: () => {
    set({ writingError: undefined });
  },
  loadWishlist: (wishlistItems) => {
    set({
      wishlistItems,
      isLoading: false,
    });
  },
  addItemToWishlist: async (product) => {
    await auth.authStateReady();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({ writingError: 'unexpectedError' });
      return false;
    }
    const wishlistItems = get().wishlistItems;
    const existingWishlistItem = wishlistItems.find((wishlistItem) => wishlistItem.productId === product.id);
    if (existingWishlistItem) {
      toast.error(<ToastErrorMessage message="productAlreadyInWishlist" />, { position: 'top-right' });
      set({ writingError: 'productAlreadyInWishlist' });
      return false;
    }

    // optimistic update
    const newWishlistItemState: WishlistItem = {
      id: product.id,
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
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    set({
      isWriting: true,
      writingError: undefined,
      wishlistItems: [...wishlistItems, newWishlistItemState],
    });
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
      await addWishlistItem({ userId: currentUser.uid, newWishlistItem, productId: product.id });
      toast.custom((t) => <ProductAddToast t={t} product={product} addTo="wishlist" />, {
        duration: 2000,
        position: 'top-right',
      });
      return true;
    } catch (error) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({
        writingError: 'unexpectedError',
        wishlistItems,
      });
      return false;
    } finally {
      set({
        isWriting: false,
      });
    }
  },
  removeItemFromWishlist: async (wishlistItemId) => {
    const wishlistItems = get().wishlistItems;
    const existingWishlistItem = wishlistItems.find((wishlistItem) => wishlistItem.id === wishlistItemId);
    await auth.authStateReady();
    const currentUser = auth.currentUser;
    if (!existingWishlistItem || !currentUser) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({ writingError: 'unexpectedError' });
      return;
    }

    // optimistic update
    const newWishlistItemsState = wishlistItems.filter((wishlistItem) => wishlistItem.id !== wishlistItemId);
    set({
      isWriting: true,
      writingError: undefined,
      wishlistItems: newWishlistItemsState,
    });

    try {
      await deleteWishlistItem({ userId: currentUser.uid, wishlistItemId });
    } catch (error) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({
        writingError: 'unexpectedError',
        wishlistItems,
      });
    } finally {
      set({
        isWriting: false,
      });
    }
  },
  addItemFromWishlistToCart: async (wishlistItemId) => {
    const addItemToCart = useCartStore.getState().addItemToCart;
    const wishlistItems = get().wishlistItems;
    const foundWishlistItem = wishlistItems.find((wishlistItem) => wishlistItem.id === wishlistItemId);
    if (!foundWishlistItem) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({
        writingError: 'unexpectedError',
      });
      return;
    }
    const { errorMessage } = foundWishlistItem;
    if (errorMessage) {
      if (errorMessage === 'out of stock') {
        toast.error(<ToastErrorMessage message="outOfStock" />, { position: 'top-right' });
        set({
          writingError: `outOfStock`,
        });
      }
      if (errorMessage === 'no longer available') {
        toast.error(<ToastErrorMessage message="noLongerAvailable" />, { position: 'top-right' });
        set({
          writingError: 'noLongerAvailable',
        });
      }
      return;
    }

    try {
      set({
        writingError: undefined,
        isWriting: true,
      });
      await addItemToCart({ ...foundWishlistItem, id: foundWishlistItem.productId, isPublic: true, tags: [] });
    } catch (error) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({
        writingError: 'unexpectedError',
      });
    } finally {
      set({
        isWriting: false,
      });
    }
  },
}));
