import * as functions from 'firebase-functions';
import { updateSaleRecordList } from './helpers/updateSaleRecordList';
import { SalesRecordData } from '../../models/salesRecord/SalesRecordData';

export const onCreateSalesRecord = functions.firestore
  .document('salesRecords/{salesRecordId}')
  .onCreate(async (snapshot, context) => {
    const { salesRecordId } = context.params;
    const salesRecordData = snapshot.data() as SalesRecordData;

    await updateSaleRecordList({ salesRecordDataAfter: salesRecordData, salesRecordId, mode: 'create' });
  });
