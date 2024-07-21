import ToastErrorMessage from '@/components/ui/toast/ToastErrorMessage';
import ToastSuccessMessage from '@/components/ui/toast/ToastSuccessMessage';
import { addAddress, AddAddressFirestoreData } from '@/firebase/api/user/address/addAddress';
import { updateAddress, UpdateAddressFirestoreData } from '@/firebase/api/user/address/updateAddress';
import { auth } from '@/firebase/config';
import { Address } from '@/models/Address';
import { AddressSchema } from '@/schemas/addressSchema';
import { serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { create } from 'zustand';

interface AddressStore {
  isLoading: boolean;
  isWriting: boolean;
  writingError: string | undefined;
  loadingError: string | undefined;
  addresses: Address[];
  loadAddress: (addresses: Address[]) => void;
  createAddress: (address: AddressSchema) => Promise<boolean>;
  editAddress: ({ addressId, address }: { addressId: string; address: AddressSchema }) => Promise<boolean>;
  removeAddress: (addressId: string) => Promise<void>;
}

export const useAddressStore = create<AddressStore>((set, get) => ({
  isLoading: true,
  isWriting: false,
  isFetch: false,
  loadingError: undefined,
  writingError: undefined,
  addresses: [],
  loadAddress: (addresses) => {
    set({
      addresses,
      isLoading: false,
    });
  },
  createAddress: async (address) => {
    await auth.authStateReady();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      set({ writingError: 'unexpectedError' });
      return false;
    }
    const existingAddresses = get().addresses;
    const newAddressState: Address = {
      ...address,
      id: 'loading',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    set({
      isWriting: true,
      writingError: undefined,
      addresses: [...existingAddresses, newAddressState],
    });

    try {
      const userId = currentUser.uid;
      // construct the new address
      const addressData: AddAddressFirestoreData = {
        ...address,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await addAddress({ userId, addressData });
      toast.success(<ToastSuccessMessage message="created" />);
      return true;
    } catch (error) {
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      set({
        writingError: 'unexpectedError',
        addresses: existingAddresses,
      });
      return false;
    } finally {
      set({
        isWriting: false,
      });
    }
  },
  editAddress: async ({ addressId, address }) => {
    if (addressId === 'loading') {
      toast.error(<ToastErrorMessage message="actionsTooQuickly" />);
      set({ writingError: 'actionsTooQuickly' });
      return false;
    }
    await auth.authStateReady();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      set({ writingError: 'unexpectedError' });
      return false;
    }
    const existingAddresses = get().addresses;
    const newAddressesState = existingAddresses.map((existingAddress) => {
      if (existingAddress.id === addressId) {
        return {
          ...existingAddress,
          ...address,
          updatedAt: new Date().getTime(),
        };
      }
      return existingAddress;
    });

    set({
      isWriting: true,
      writingError: undefined,
      addresses: newAddressesState,
    });
    try {
      const userId = currentUser.uid;
      // construct the new address
      const addressData: UpdateAddressFirestoreData = {
        ...address,
        updatedAt: serverTimestamp(),
      };
      await updateAddress({ userId, addressId, addressData });
      toast.success(<ToastSuccessMessage message="updated" />);
      return true;
    } catch (error) {
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      set({
        writingError: 'unexpectedError',
        addresses: existingAddresses,
      });
      return false;
    } finally {
      set({
        isWriting: false,
      });
    }
  },
  removeAddress: async (addressId) => {
    if (addressId === 'loading') {
      toast.error(<ToastErrorMessage message="actionsTooQuickly" />);
      set({ writingError: 'actionsTooQuickly' });
      return;
    }
    await auth.authStateReady();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      set({ writingError: 'unexpectedError' });
      return;
    }
    const existingAddresses = get().addresses;
    const newAddressesState = existingAddresses.filter((existingAddresses) => existingAddresses.id !== addressId);

    set({
      isWriting: true,
      writingError: undefined,
      addresses: newAddressesState,
    });
    try {
      const userId = currentUser.uid;
      const addressData: UpdateAddressFirestoreData = {
        updatedAt: serverTimestamp(),
        deletedAt: serverTimestamp(),
      };
      await updateAddress({ userId, addressId, addressData });
      toast.success(<ToastSuccessMessage message="deleted" />);
    } catch (error) {
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      set({
        writingError: 'unexpectedError',
        addresses: existingAddresses,
      });
    } finally {
      set({
        isWriting: false,
      });
    }
  },
}));
