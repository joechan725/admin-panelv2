import { handleImageUpload } from '@/firebase/api/image/handleImageUpload';
import { getUser } from '@/firebase/api/user/getUser';
import { getUsers } from '@/firebase/api/user/getUsers';
import { updateUser, UpdateUserFirestoreData } from '@/firebase/api/user/updateUser';
import { downgradeUserFromAdmin } from '@/firebase/callable/downgradeUserToAdmin';
import { upgradeUserToAdmin } from '@/firebase/callable/upgradeUserToAdmin';
import { addDeleteFieldForEmptyFieldInObject } from '@/lib/helpers/objects/addDeleteFieldForEmptyFieldInObject';
import { capitalizeFirstLetterOfEachWord } from '@/lib/helpers/string/capitalizeFirstLetterOfEachWord';
import { ImageInput } from '@/models/ImageInput';
import { User } from '@/models/user/User';
import { ProfileSchema } from '@/schemas/user/profileSchema';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useToast } from '../../toast/useToast';

interface EditUserProfileParameters {
  userId: string;
  formData: ProfileSchema;
  avatar: ImageInput | undefined;
}

export const useAdminUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);

  const [user, setUser] = useState<User | undefined | undefined>(undefined);
  const [users, setUsers] = useState<User[] | undefined>(undefined);

  const { toastSuccess, toastError } = useToast();

  const loadUser = async (userId: string) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const userData = await getUser(userId);
      setUser(userData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const loadUsers = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const runUpgradeUserToAdmin = async (userId: string) => {
    setIsWriting(true);
    setError(undefined);
    try {
      await upgradeUserToAdmin({ userId });
      toastSuccess('upgraded');
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return false;
      }
      toastError('unexpectedError');
      setError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  const runDowngradeUserFromAdmin = async (userId: string) => {
    setIsWriting(true);
    setError(undefined);
    try {
      await downgradeUserFromAdmin({ userId });
      toastSuccess('downgraded');
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toastError(error.message);
        return false;
      }
      toastError('unexpectedError');
      setError('unexpectedError');
      return true;
    } finally {
      setIsWriting(false);
    }
  };

  const editUserProfile = async ({ userId, formData, avatar }: EditUserProfileParameters) => {
    setIsWriting(true);
    setError(undefined);

    const { dateOfBirth, firstName, lastName } = formData;

    // The updated timestamp
    const updatedUser: UpdateUserFirestoreData = {
      ...formData,
      firstName: capitalizeFirstLetterOfEachWord(firstName),
      lastName: lastName ? capitalizeFirstLetterOfEachWord(lastName) : undefined,
      dateOfBirth: dateOfBirth !== '' ? dateOfBirth : undefined,
      updatedAt: serverTimestamp(),
    };

    try {
      updatedUser.avatar = await handleImageUpload(`/images/users/${userId}`, avatar, "User's avatar");
      const filteredUserData = addDeleteFieldForEmptyFieldInObject(updatedUser);
      await updateUser({ userId, userData: filteredUserData });
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

  return {
    loadUser,
    user,
    loadUsers,
    users,
    isLoading,
    isWriting,
    error,
    runUpgradeUserToAdmin,
    runDowngradeUserFromAdmin,
    editUserProfile,
  };
};
