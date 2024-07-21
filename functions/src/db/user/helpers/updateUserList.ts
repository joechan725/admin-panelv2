import { FieldValue } from 'firebase-admin/firestore';
import { maxUsersPreList } from '../../maxItemsPreList';
import { UserData } from '../../../models/user/UserData';
import { UserListData } from '../../../models/user/UserListData';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';

type UpdatePrivateUserParameters = CreateModeParameters | UpdateModeParameters | DeleteModeParameters;

interface CreateModeParameters {
  userId: string;
  userDataBefore?: undefined;
  userDataAfter: UserData;
  mode: 'create';
}

interface UpdateModeParameters {
  userId: string;
  userDataBefore: UserData;
  userDataAfter: UserData;
  mode: 'update';
}

interface DeleteModeParameters {
  userId: string;
  userDataBefore: UserData;
  userDataAfter?: undefined;
  mode: 'delete';
}

/**
 * Update the privateUserList (denormalization) when the user is written.
 *
 * @param userId - The id of the user
 * @param userDataAfter - The user firebase data after
 * @param userDataBefore - The user firebase data before
 * @param mode - 'create' | 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateUserList = async ({ userId, userDataAfter, userDataBefore, mode }: UpdatePrivateUserParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    const privateUserListsRef = db.collection('privateUserLists');

    if (mode === 'create') {
      // The list item to be joined
      const userDataAfterWithId = {
        ...userDataAfter,
        id: userId,
      };
      const userListDataUnion: ExtendWithFieldValue<Partial<UserListData>> = {
        ids: FieldValue.arrayUnion(userId),
        users: FieldValue.arrayUnion(userDataAfterWithId),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Update private list
      // Find the latest list which contains users < maxUsersPreList
      const privateUserListsRefQuery = privateUserListsRef
        .orderBy('createdAt', 'desc')
        .where('itemCount', '<', maxUsersPreList)
        .limit(1);
      const privateUserListsSnap = await privateUserListsRefQuery.get();
      const privateUserListSnap = privateUserListsSnap.docs.at(0);
      if (privateUserListSnap?.exists) {
        // The latest created list exist
        // Join the user to that list
        const privateUserListRef = privateUserListSnap.ref;
        bigBatch.set(privateUserListRef, userListDataUnion, { merge: true });
      } else {
        // The latest list does not exist
        // Create a new list
        const privateUserListRef = privateUserListsRef.doc();
        userListDataUnion.createdAt = FieldValue.serverTimestamp();
        bigBatch.set(privateUserListRef, userListDataUnion, { merge: true });
      }
    }

    if (mode === 'update') {
      // The list item to be removed
      const userDataBeforeWithId = {
        ...userDataBefore,
        id: userId,
      };
      const userListDataRemove: ExtendWithFieldValue<Partial<UserListData>> = {
        users: FieldValue.arrayRemove(userDataBeforeWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // The list item to be joined
      const userDataAfterWithId = {
        ...userDataAfter,
        id: userId,
      };
      const userListDataUnion: ExtendWithFieldValue<Partial<UserListData>> = {
        users: FieldValue.arrayUnion(userDataAfterWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Update private list
      const privateUserListsQuery = privateUserListsRef.where('ids', 'array-contains', userId).limit(1);
      const privateUserListsSnap = await privateUserListsQuery.get();
      const privateUserListSnap = privateUserListsSnap.docs.at(0);

      if (privateUserListSnap?.exists) {
        // The user exists at a list already
        // Update the user at that list
        const privateUserListRef = privateUserListSnap.ref;
        bigBatch.set(privateUserListRef, userListDataRemove, { merge: true });
        bigBatch.set(privateUserListRef, userListDataUnion, { merge: true });
      } else {
        // No actions required if the user does not exist at a list
        throw new Error(`Error on updating user ${userId} from the list. User ${userId} dose not exist at any list`);
      }
    }

    if (mode === 'delete') {
      // The list item to be removed
      const userDataBeforeWithId = {
        ...userDataBefore,
        id: userId,
      };
      const userListDataRemove: ExtendWithFieldValue<Partial<UserListData>> = {
        users: FieldValue.arrayRemove(userDataBeforeWithId),
        updatedAt: FieldValue.serverTimestamp(),
        ids: FieldValue.arrayRemove(userId),
        itemCount: FieldValue.increment(-1),
      };
      // Update private list
      const privateUserListsQuery = privateUserListsRef.where('ids', 'array-contains', userId).limit(1);
      const privateUserListsSnap = await privateUserListsQuery.get();
      const privateUserListSnap = privateUserListsSnap.docs.at(0);

      if (privateUserListSnap?.exists) {
        // The user exist at a list
        // Remove the user from the list
        const privateUserListRef = privateUserListSnap.ref;
        bigBatch.set(privateUserListRef, userListDataRemove, { merge: true });
      } else {
        // No actions required if the user does not exist at a list
        throw new Error(`Error on deleting user ${userId} from the list. User ${userId} dose not exist at any list`);
      }
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating user list', error);
  }
};
