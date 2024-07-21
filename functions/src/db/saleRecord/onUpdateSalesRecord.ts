import * as functions from 'firebase-functions';
import { updateSaleRecordList } from './helpers/updateSaleRecordList';
import { SalesRecordData } from '../../models/salesRecord/SalesRecordData';

export const onUpdateSalesRecord = functions.firestore
  .document('salesRecords/{salesRecordId}')
  .onUpdate(async (change, context) => {
    const { salesRecordId } = context.params;
    const salesRecordSnapBefore = change.before;
    const salesRecordSnapAfter = change.after;

    const salesRecordDataBefore = salesRecordSnapBefore.data() as SalesRecordData;
    const salesRecordDataAfter = salesRecordSnapAfter.data() as SalesRecordData;

    if (salesRecordDataAfter.deletedAt === undefined) {
      // The product sales record is updated.
      await updateSaleRecordList({
        salesRecordId,
        salesRecordDataAfter,
        salesRecordDataBefore,
        mode: 'update',
      });
    }

    if (salesRecordDataAfter.deletedAt !== undefined) {
      // The product sales record is deleted.
      await updateSaleRecordList({
        salesRecordId,
        salesRecordDataBefore,
        mode: 'delete',
      });
    }
  });
