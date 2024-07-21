import DeliveryOptionUsageRecordItem from './DeliveryOptionUsageRecordItem';
import { DeliveryOptionUsageRecord } from '@/models/deliveryOption/usageRecord/DeliveryOptionUsageRecord';

interface DeliveryOptionUsageRecordListProps {
  deliveryOptionUsageRecords: DeliveryOptionUsageRecord[];
}
const DeliveryOptionUsageRecordList = ({ deliveryOptionUsageRecords }: DeliveryOptionUsageRecordListProps) => {
  return (
    deliveryOptionUsageRecords &&
    deliveryOptionUsageRecords.length > 0 &&
    deliveryOptionUsageRecords.map((deliveryOptionUsageRecord) => (
      <DeliveryOptionUsageRecordItem
        key={deliveryOptionUsageRecord.id}
        deliveryOptionUsageRecord={deliveryOptionUsageRecord}
      />
    ))
  );
};
export default DeliveryOptionUsageRecordList;
