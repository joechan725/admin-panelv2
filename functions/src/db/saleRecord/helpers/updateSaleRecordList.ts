import { FieldValue } from 'firebase-admin/firestore';
import { SalesRecordData } from '../../../models/salesRecord/SalesRecordData';
import { SalesRecordListData } from '../../../models/salesRecord/SalesRecordListData';
import { maxSalesRecordsPreList } from '../../maxItemsPreList';
import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { BigBatch } from '../../../classes/BigBatch';
import { db } from '../../../admin';
import { logger } from 'firebase-functions/v1';

type UpdateSaleRecordListParameters = CreateModeParameters | UpdateModeParameters | DeleteModeParameters;

interface CreateModeParameters {
  salesRecordId: string;
  salesRecordDataBefore?: undefined;
  salesRecordDataAfter: SalesRecordData;
  mode: 'create';
}

interface UpdateModeParameters {
  salesRecordId: string;
  salesRecordDataBefore: SalesRecordData;
  salesRecordDataAfter: SalesRecordData;
  mode: 'update';
}

interface DeleteModeParameters {
  salesRecordId: string;
  salesRecordDataBefore: SalesRecordData;
  salesRecordDataAfter?: undefined;
  mode: 'delete';
}

/**
 * Update the salesRecordList when the salesRecord is written.
 *
 * @param salesRecordId - The id of the sales record
 * @param salesRecordDataBefore The data of sales record
 * @param salesRecordDataAfter The data of sales record
 * @param mode - 'create' | 'update' | 'delete';
 *
 * @returns A promise of void
 */

export const updateSaleRecordList = async ({
  salesRecordDataBefore,
  salesRecordDataAfter,
  salesRecordId,
  mode,
}: UpdateSaleRecordListParameters) => {
  try {
    const bigBatch = new BigBatch(db);

    const salesRecordListsRef = db.collection('salesRecordLists');

    if (mode === 'create') {
      // List data to be joined
      const salesRecordDataAfterWithId = {
        ...salesRecordDataAfter,
        id: salesRecordId,
      };
      const salesRecordListDataUnion: ExtendWithFieldValue<Partial<SalesRecordListData>> = {
        salesRecords: FieldValue.arrayUnion(salesRecordDataAfterWithId),
        ids: FieldValue.arrayUnion(salesRecordId),
        itemCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Add sales record to the list
      // Find the latest list which contains records < maxSalesRecordsPreList
      const salesRecordListsRefQuery = salesRecordListsRef
        .orderBy('createdAt', 'desc')
        .where('itemCount', '<', maxSalesRecordsPreList)
        .limit(1);
      const salesRecordListsSnap = await salesRecordListsRefQuery.get();
      const salesRecordListSnap = salesRecordListsSnap.docs.at(0);
      if (salesRecordListSnap?.exists) {
        // The latest created list exist
        // Join the record to that list
        const salesRecordListRef = salesRecordListSnap.ref;
        bigBatch.set(salesRecordListRef, salesRecordListDataUnion, { merge: true });
      } else {
        // The latest list contains over maxProductsPreList products
        // Create a new list
        const productRecordListRef = salesRecordListsRef.doc();
        salesRecordListDataUnion.createdAt = FieldValue.serverTimestamp();
        bigBatch.set(productRecordListRef, salesRecordListDataUnion, { merge: true });
      }
    }

    if (mode === 'update') {
      // List data to be removed
      const salesRecordDataBeforeWithId = {
        ...salesRecordDataBefore,
        id: salesRecordId,
      };
      const salesRecordListDataRemove: ExtendWithFieldValue<Partial<SalesRecordListData>> = {
        salesRecords: FieldValue.arrayRemove(salesRecordDataBeforeWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // List data to be joined
      const salesRecordDataAfterWithId = {
        ...salesRecordDataAfter,
        id: salesRecordId,
      };
      const salesRecordListDataUnion: ExtendWithFieldValue<Partial<SalesRecordListData>> = {
        salesRecords: FieldValue.arrayUnion(salesRecordDataAfterWithId),
        updatedAt: FieldValue.serverTimestamp(),
      };

      // Update private list
      const salesRecordListsQuery = salesRecordListsRef.where('ids', 'array-contains', salesRecordId).limit(1);
      const salesRecordListsSnap = await salesRecordListsQuery.get();
      const salesRecordListSnap = salesRecordListsSnap.docs.at(0);

      if (salesRecordListSnap?.exists) {
        // The record exists at a list already
        // Update the record at that list
        const salesRecordListRef = salesRecordListSnap.ref;
        bigBatch.set(salesRecordListRef, salesRecordListDataRemove, { merge: true });
        bigBatch.set(salesRecordListRef, salesRecordListDataUnion, { merge: true });
      } else {
        // No actions required if the user does not exist at a list
        throw new Error(
          `Error on updating sales record ${salesRecordId} from the list. Sales record ${salesRecordId} dose not exist at any list`
        );
      }
    }

    if (mode === 'delete') {
      // List data to be removed
      const salesRecordDataBeforeWithId = {
        ...salesRecordDataBefore,
        id: salesRecordId,
      };
      const salesRecordListDataRemove: ExtendWithFieldValue<Partial<SalesRecordListData>> = {
        salesRecords: FieldValue.arrayRemove(salesRecordDataBeforeWithId),
        updatedAt: FieldValue.serverTimestamp(),
        ids: FieldValue.arrayRemove(salesRecordId),
        itemCount: FieldValue.increment(-1),
      };

      // Remove the record from private list
      const salesRecordListsQuery = salesRecordListsRef.where('ids', 'array-contains', salesRecordId).limit(1);
      const salesRecordListsSnap = await salesRecordListsQuery.get();
      const salesRecordListSnap = salesRecordListsSnap.docs.at(0);

      if (salesRecordListSnap?.exists) {
        // The record exist at a list
        // Remove the record from the list
        // Note: the userId shall be remain since there might be some other records with same userId at the list
        const salesRecordListRef = salesRecordListSnap.ref;
        bigBatch.set(salesRecordListRef, salesRecordListDataRemove, { merge: true });
      } else {
        // No actions required if the user does not exist at a list
        throw new Error(
          `Error on deleting sales record ${salesRecordId} from the list. Sales record ${salesRecordId} dose not exist at any list`
        );
      }
    }
    await bigBatch.commit();
  } catch (error) {
    logger.error('Error on updating sale record list', error);
  }
};
