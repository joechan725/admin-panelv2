import { create } from 'zustand';
import { serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import ProductAddToast from '@/components/ui/toast/ProductAddToast';
import { addCartItem, AddCartItemFirestoreData } from '@/firebase/api/user/cartItem/addCartItem';
import { deleteCartItem } from '@/firebase/api/user/cartItem/deleteCartItem';
import { updateCartItemQuantity } from '@/firebase/api/user/cartItem/updateCartItemQuantity';
import { auth } from '@/firebase/config';
import { CartItem } from '@/models/user/cartItem/CartItem';
import { Product } from '@/models/product/Product';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { useWishlistStore } from './useWishlistStore';
import ToastErrorMessage from '@/components/ui/toast/ToastErrorMessage';

interface CartStore {
  isLoading: boolean;
  isWriting: boolean;
  loadingError: string | undefined;
  writingError: string | undefined;
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  clearWritingError: () => void;
  loadCart: (cartItems: CartItem[]) => void;
  addItemToCart: (product: Product, quantity?: number) => Promise<void>;
  removeItemFromCart: (cartItemId: string) => Promise<void>;
  incrementItem: (cartItemId: string, incrementQuantity?: number) => Promise<void>;
  decrementItem: (cartItemId: string, quantity?: number) => Promise<void>;
  changeQuantity: (cartItemId: string, decrementQuantity: number) => Promise<void>;
  moveCartItemToWishList: (cartItemId: string) => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  isLoading: true,
  isWriting: false,
  loadingError: undefined,
  writingError: undefined,
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
  clearWritingError: () => {
    set({ writingError: undefined });
  },
  loadCart: (cartItems) => {
    const totalPrice = cartItems.reduce((accumulator, cartItem) => {
      const { quantity, sellingPrice, markedPrice } = cartItem;
      const unitPrice = sellingPrice ?? markedPrice;

      if (cartItem.errorMessage) {
        return accumulator;
      }
      return accumulator + quantity * unitPrice;
    }, 0);

    const totalQuantity = cartItems.reduce((accumulator, cartItem) => {
      if (cartItem.errorMessage) {
        return accumulator;
      }
      return accumulator + cartItem.quantity;
    }, 0);
    set({
      totalQuantity,
      totalPrice,
      cartItems,
      isLoading: false,
    });
  },
  addItemToCart: async (product, quantity = 1) => {
    await auth.authStateReady();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, {
        position: 'top-right',
      });
      set({ writingError: 'unexpectedError' });
      return;
    }
    const cartItems = get().cartItems;
    const incrementItem = get().incrementItem;

    // Check if the product is already in cart or not
    const existingCartItem = cartItems.find((cartItem) => cartItem.productId === product.id);
    if (existingCartItem) {
      // Increment the product quantity if in the cart already.
      const newQuantity = existingCartItem.quantity + quantity;
      const existingStock = existingCartItem.stock;
      if (newQuantity > existingStock) {
        toast.error(<ToastErrorMessage message="notEnoughStock" translationValues={{ stock: existingStock }} />, {
          position: 'top-right',
        });
        set({
          writingError: `Sorry, only ${existingStock} unit${existingStock > 1 ? 's' : ''} of ${
            existingCartItem.nameEN
          } are available.`,
        });
        return;
      }
      await incrementItem(existingCartItem.id, quantity);
      toast.custom((t) => <ProductAddToast t={t} product={product} addTo="cart" />, {
        duration: 2000,
        position: 'top-right',
      });
      return;
    }
    const existingStock = product.stock;
    if (quantity > existingStock) {
      toast.error(<ToastErrorMessage message="notEnoughStock" translationValues={{ stock: existingStock }} />, {
        position: 'top-right',
      });
      set({
        writingError: `Sorry, only ${existingStock} unit${existingStock > 1 ? 's' : ''} of ${
          product.nameEN
        } are available.`,
      });
      return;
    }

    const newCartItemState: CartItem = {
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
      quantity,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    set({
      isWriting: true,
      writingError: undefined,
      cartItems: [...cartItems, newCartItemState],
    });
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
      await addCartItem({ userId: currentUser.uid, newCartItem, productId: product.id });
      toast.custom((t) => <ProductAddToast t={t} product={product} addTo="cart" />, {
        duration: 2000,
        position: 'top-right',
      });
    } catch (error) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({
        writingError: 'unexpectedError',
        cartItems,
      });
    } finally {
      set({
        isWriting: false,
      });
    }
  },
  removeItemFromCart: async (cartItemId) => {
    const cartItems = get().cartItems;
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemId);
    await auth.authStateReady();
    const currentUser = auth.currentUser;
    if (!existingCartItem || !currentUser) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({ writingError: 'unexpectedError' });
      return;
    }
    const newCartItemsState: CartItem[] = cartItems.filter((cartItem) => cartItem.id !== cartItemId);

    set({
      isWriting: true,
      writingError: undefined,
      cartItems: newCartItemsState,
    });
    try {
      await deleteCartItem({ userId: currentUser.uid, cartItemId });
    } catch (error) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({
        writingError: 'unexpectedError',
        cartItems,
      });
    } finally {
      set({
        isWriting: false,
      });
    }
  },
  incrementItem: async (cartItemId, incrementQuantity = 1) => {
    const cartItems = get().cartItems;
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemId);
    await auth.authStateReady();
    const currentUser = auth.currentUser;
    if (!existingCartItem || !currentUser) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({ writingError: 'unexpectedError' });
      return;
    }
    const newQuantity = existingCartItem.quantity + incrementQuantity;
    const existingStock = existingCartItem.stock;

    const newCartItemsState: CartItem[] = cartItems.map((cartItem) => {
      if (cartItem.id === cartItemId) {
        return {
          ...cartItem,
          quantity: newQuantity,
          updatedAt: new Date().getTime(),
        };
      }
      return cartItem;
    });

    set({
      isWriting: true,
      writingError: undefined,
      cartItems: newCartItemsState,
    });
    if (newQuantity > existingStock) {
      toast.error(<ToastErrorMessage message="notEnoughStock" translationValues={{ stock: existingStock }} />, {
        position: 'top-right',
      });
      set({
        writingError: `Sorry, only ${existingStock} unit${existingStock > 1 ? 's' : ''} of ${
          existingCartItem.nameEN
        } are available.`,
      });
      return;
    }

    try {
      await updateCartItemQuantity({ userId: currentUser.uid, quantity: newQuantity, cartItemId });
    } catch (error) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({
        writingError: 'unexpectedError',
        cartItems,
      });
    } finally {
      set({
        isWriting: false,
      });
    }
  },
  decrementItem: async (cartItemId, decrementQuantity = 1) => {
    const cartItems = get().cartItems;
    const removeItemFromCart = get().removeItemFromCart;
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemId);
    await auth.authStateReady();
    const currentUser = auth.currentUser;
    if (!existingCartItem || !currentUser) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({ writingError: 'unexpectedError' });
      return;
    }
    const newQuantity = existingCartItem.quantity - decrementQuantity;
    if (newQuantity === 0) {
      removeItemFromCart(cartItemId);
      return;
    }

    const newCartItemsState: CartItem[] = cartItems.map((cartItem) => {
      if (cartItem.id === cartItemId) {
        return {
          ...cartItem,
          quantity: newQuantity,
          updatedAt: new Date().getTime(),
        };
      }
      return cartItem;
    });

    set({
      isWriting: true,
      writingError: undefined,
      cartItems: newCartItemsState,
    });
    try {
      await updateCartItemQuantity({ userId: currentUser.uid, quantity: newQuantity, cartItemId });
    } catch (error) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({
        writingError: 'unexpectedError',
        cartItems,
      });
    } finally {
      set({
        isWriting: false,
      });
    }
  },
  changeQuantity: async (cartItemId, quantity) => {
    const cartItems = get().cartItems;
    const removeItemFromCart = get().removeItemFromCart;
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemId);
    await auth.authStateReady();
    const currentUser = auth.currentUser;
    if (!existingCartItem || !currentUser) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({ writingError: 'unexpectedError' });
      return;
    }
    if (existingCartItem.quantity === quantity) {
      return;
    }
    if (quantity === 0) {
      removeItemFromCart(cartItemId);
      return;
    }
    const existingStock = existingCartItem.stock;
    if (quantity > existingStock) {
      toast.error(<ToastErrorMessage message="notEnoughStock" translationValues={{ stock: existingStock }} />, {
        position: 'top-right',
      });
      set({
        writingError: `Sorry, only ${existingStock} unit${existingStock > 1 ? 's' : ''} of ${
          existingCartItem.nameEN
        } are available.`,
      });
      return;
    }

    const newCartItemsState: CartItem[] = cartItems.map((cartItem) => {
      if (cartItem.id === cartItemId) {
        return {
          ...cartItem,
          quantity,
          updatedAt: new Date().getTime(),
        };
      }
      return cartItem;
    });

    set({
      isWriting: true,
      writingError: undefined,
      cartItems: newCartItemsState,
    });
    try {
      await updateCartItemQuantity({ userId: currentUser.uid, quantity, cartItemId });
    } catch (error) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({
        writingError: 'unexpectedError',
        cartItems,
      });
    } finally {
      set({
        isWriting: false,
      });
    }
  },
  moveCartItemToWishList: async (cartItemId) => {
    const cartItems = get().cartItems;
    const removeItemFromCart = get().removeItemFromCart;
    const addItemToWishlist = useWishlistStore.getState().addItemToWishlist;
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemId);
    if (!existingCartItem) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({ writingError: 'unexpectedError' });
      return;
    }
    const newCartItemsState = cartItems.filter((cartItem) => cartItem.id !== cartItemId);
    set({
      isWriting: true,
      writingError: undefined,
      cartItems: newCartItemsState,
    });
    try {
      const res = await addItemToWishlist({
        ...existingCartItem,
        id: existingCartItem.productId,
        isPublic: true,
        tags: [],
      });
      if (res) {
        await removeItemFromCart(cartItemId);
      }
    } catch (error) {
      toast.error(<ToastErrorMessage message="unexpectedError" />, { position: 'top-right' });
      set({
        writingError: 'unexpectedError',
        // Roll back to the previous state
        cartItems,
      });
      return;
    } finally {
      set({ isWriting: false });
    }
  },
}));
