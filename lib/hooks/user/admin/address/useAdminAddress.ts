import { getAddress } from '@/firebase/api/user/address/getAddress';
import { getAddresses } from '@/firebase/api/user/address/getAddresses';
import { updateAddress, UpdateAddressFirestoreData } from '@/firebase/api/user/address/updateAddress';
import { addDeleteFieldForEmptyFieldInObject } from '@/lib/helpers/objects/addDeleteFieldForEmptyFieldInObject';
import { Address } from '@/models/Address';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { addAddress, AddAddressFirestoreData } from '@/firebase/api/user/address/addAddress';
import { AddressSchema } from '@/schemas/addressSchema';
import { useToast } from '../../../toast/useToast';

interface LoadAddressParameters {
  userId: string;
  addressId: string;
}

interface LoadAddressesParameters {
  userId: string;
}

interface CreateAddressParameters {
  userId: string;
  addressData: AddressSchema;
}

interface EditAddressParameters {
  userId: string;
  addressId: string;
  addressData: AddressSchema;
}

interface RemoveAddressParameters {
  userId: string;
  addressId: string;
}

export const useAdminAddress = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);

  const [address, setAddress] = useState<Address | undefined>(undefined);
  const [addresses, setAddresses] = useState<Address[] | undefined>(undefined);

  const { toastSuccess, toastError } = useToast();

  const loadAddress = async ({ userId, addressId }: LoadAddressParameters) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const addressData = await getAddress({ userId, addressId });
      setAddress(addressData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAddresses = async ({ userId }: LoadAddressesParameters) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const addressesData = await getAddresses({ userId });
      setAddresses(addressesData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const createAddress = async ({ addressData, userId }: CreateAddressParameters) => {
    setIsWriting(true);
    setError(undefined);

    const filteredAddress = removeEmptyFieldFormObject(addressData);

    // The created timestamp
    const createdAddress: AddAddressFirestoreData = {
      ...filteredAddress,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      await addAddress({ userId, addressData: createdAddress });
      toastSuccess('created');
      return true;
    } catch (error) {
      setError('unexpectedError');
      toastError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const editAddress = async ({ addressId, addressData, userId }: EditAddressParameters) => {
    setIsWriting(true);
    setError(undefined);

    const filteredAddress = addDeleteFieldForEmptyFieldInObject(addressData);

    // The updated timestamp
    const updatedAddress: UpdateAddressFirestoreData = {
      ...filteredAddress,
      updatedAt: serverTimestamp(),
    };

    try {
      await updateAddress({ userId, addressId, addressData: updatedAddress });
      toastSuccess('updated');
      return true;
    } catch (error) {
      setError('unexpectedError');
      toastError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const removeAddress = async ({ addressId, userId }: RemoveAddressParameters) => {
    setIsWriting(true);
    setError(undefined);

    try {
      const addressData: UpdateAddressFirestoreData = {
        updatedAt: serverTimestamp(),
        deletedAt: serverTimestamp(),
      };
      await updateAddress({ userId, addressId, addressData });
      toastSuccess('deleted');
      return true;
    } catch (error) {
      setError('unexpectedError');
      toastError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  return {
    loadAddress,
    address,
    loadAddresses,
    addresses,
    isLoading,
    isWriting,
    error,
    createAddress,
    editAddress,
    removeAddress,
  };
};
