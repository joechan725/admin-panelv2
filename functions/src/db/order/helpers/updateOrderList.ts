import { FieldValue } from 'firebase-admin/firestore';
import { maxOrdersPreList } from '../../maxItemsPreList';
import { OrderData } from '../../../models/order/OrderData';
import { OrderListData } from '../../../models/order/OrderListData';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';

type UpdateOrderListParameters = CreateMode | UpdateMode | DeleteMode;

interface CreateMode {
  orderId: string;
  userId: string;
  orderDataAfter: OrderData;
  orderDataBefore?: undefined;
  mode: 'create';
}

interface UpdateMode {
  orderId: string;
  userId: string;
  orderDataAfter: OrderData;
  orderDataBefore: OrderData;
  mode: 'update';
}

interface DeleteMode {
  orderId: string;
  userId: string;
  orderDataBefore: OrderData;
  orderDataAfter?: undefined;
  mode: 'delete';
}

/**
 * Update the privateOrderList and userOrderList (denormalization) when the order is written.
 *
 * @param orderId - The id of the order
 * @param userId - The id of the order placer
 * @param orderDataAfter - The order firebase data after
 * @param orderDataBefore - The order firebase data before
 * @param mode - 'create' | 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateOrderList = async ({
  orderId,
  userId,
  orderDataAfter,
  orderDataBefore,
  mode,
}: UpdateOrderListParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    const privateOrderListsRef = db.collection('privateOrderLists');
    const userOrderListsRef = db.collection('users').doc(userId).collection('orderLists');

    if (mode === 'create') {
      // The list data to be joined
      const orderDataAfterWithId = {
        ...orderDataAfter,
        id: orderId,
      };
      const orderListData: ExtendWithFieldValue<Partial<OrderListData>> = {
        ids: FieldValue.arrayUnion(orderId),
        orders: FieldValue.arrayUnion(orderDataAfterWithId),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Add order to user order list
      // Query the latest list which contains orders < maxOrdersPreList
      const userOrderListsRefQuery = userOrderListsRef
        .orderBy('createdAt', 'desc')
        .where('itemCount', '<', maxOrdersPreList)
        .limit(1);
      const userOrderListsSnap = await userOrderListsRefQuery.get();
      const userOrderListSnap = userOrderListsSnap.docs.at(0);
      if (userOrderListSnap?.exists) {
        // The latest created list exist
        // Join the order to that list
        const userOrderListRef = userOrderListSnap.ref;
        bigBatch.set(userOrderListRef, orderListData, { merge: true });
      } else {
        // The latest list does not exist
        // Create a new list
        const userOrderListRef = userOrderListsRef.doc();
        orderListData.createdAt = FieldValue.serverTimestamp();
        bigBatch.set(userOrderListRef, orderListData, { merge: true });
      }

      // Add order to private list
      // Query the latest list with contains orders < maxOrdersPreList
      const privateOrderListsRefQuery = privateOrderListsRef
        .orderBy('createdAt', 'desc')
        .where('itemCount', '<', maxOrdersPreList)
        .limit(1);
      const privateOrderListsSnap = await privateOrderListsRefQuery.get();
      const privateOrderListSnap = privateOrderListsSnap.docs.at(0);
      if (privateOrderListSnap?.exists) {
        // The latest created list exist
        // Join the order to that list
        const privateOrderListRef = privateOrderListSnap.ref;
        bigBatch.set(privateOrderListRef, orderListData, { merge: true });
      } else {
        // The latest list does not exist
        // Create a new list
        const privateOrderListRef = privateOrderListsRef.doc();
        orderListData.createdAt = FieldValue.serverTimestamp();
        bigBatch.set(privateOrderListRef, orderListData, { merge: true });
      }
    }

    if (mode === 'update') {
      // The list data to be removed
      const orderDataBeforeWithId = {
        ...orderDataBefore,
        id: orderId,
      };
      const orderListDataRemove: ExtendWithFieldValue<Partial<OrderListData>> = {
        orders: FieldValue.arrayRemove(orderDataBeforeWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // The list data to be joined
      const orderDataAfterWithId = {
        ...orderDataAfter,
        id: orderId,
      };
      const orderListDataUnion: ExtendWithFieldValue<Partial<OrderListData>> = {
        orders: FieldValue.arrayUnion(orderDataAfterWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Update order at user order list
      const userOrderListsQuery = userOrderListsRef.where('ids', 'array-contains', orderId).limit(1);
      const userOrderListsSnap = await userOrderListsQuery.get();
      const userOrderListSnap = userOrderListsSnap.docs.at(0);

      if (userOrderListSnap?.exists) {
        // The order exists at a list already
        // Update the order at that list
        const userOrderListRef = userOrderListSnap.ref;
        bigBatch.set(userOrderListRef, orderListDataRemove, { merge: true });
        bigBatch.set(userOrderListRef, orderListDataUnion, { merge: true });
      } else {
        // No actions required if the order does not exist at a list
        throw new Error(`Error on updating order ${orderId} in the list. Order ${orderId} dose not exist at any list`);
      }

      // Update order at private list
      const privateOrderListsQuery = privateOrderListsRef.where('ids', 'array-contains', orderId).limit(1);
      const privateOrderListsSnap = await privateOrderListsQuery.get();
      const privateOrderListSnap = privateOrderListsSnap.docs.at(0);

      if (privateOrderListSnap?.exists) {
        // The order exists at a list already
        // Update the order at that list
        const privateOrderListRef = privateOrderListSnap.ref;

        bigBatch.set(privateOrderListRef, orderListDataRemove, { merge: true });
        bigBatch.set(privateOrderListRef, orderListDataUnion, { merge: true });
      } else {
        // No actions required if the order does not exist at a list
        throw new Error(`Error on updating order ${orderId} in the list. Order ${orderId} dose not exist at any list`);
      }
    }

    if (mode === 'delete') {
      // The list data to be removed
      const orderDataBeforeWithId = {
        ...orderDataBefore,
        id: orderId,
      };
      const orderListDataRemove: ExtendWithFieldValue<Partial<OrderListData>> = {
        orders: FieldValue.arrayRemove(orderDataBeforeWithId),
        ids: FieldValue.arrayRemove(orderId),
        itemCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Remove order from the user order list
      const userOrderListsQuery = userOrderListsRef.where('ids', 'array-contains', orderId).limit(1);
      const userOrderListsSnap = await userOrderListsQuery.get();
      const userOrderListSnap = userOrderListsSnap.docs.at(0);

      if (userOrderListSnap?.exists) {
        // The order exist at a list
        // Remove the order from the list
        const userOrderListRef = userOrderListSnap.ref;
        bigBatch.set(userOrderListRef, orderListDataRemove, { merge: true });
      } else {
        // No actions required if the order does not exist at a list
        throw new Error(
          `Error on deleting order ${orderId} from the list. Order ${orderId} dose not exist at any list`
        );
      }

      // Remove order from the private list
      const privateOrderListsQuery = privateOrderListsRef.where('ids', 'array-contains', orderId).limit(1);
      const privateOrderListsSnap = await privateOrderListsQuery.get();
      const privateOrderListSnap = privateOrderListsSnap.docs.at(0);

      if (privateOrderListSnap?.exists) {
        // The order exist at a list
        // Remove the order from the list
        const privateOrderListRef = privateOrderListSnap.ref;
        bigBatch.set(privateOrderListRef, orderListDataRemove, { merge: true });
      } else {
        // No actions required if the order does not exist at a list
        throw new Error(
          `Error on deleting order ${orderId} from the list. Order ${orderId} dose not exist at any list`
        );
      }
    }

    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating order list', error);
  }
};
