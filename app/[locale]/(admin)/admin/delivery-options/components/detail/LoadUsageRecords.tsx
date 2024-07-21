import { useDeliveryOptionUsageRecordListsListener } from '@/lib/hooks/deliveryOption/usageRecord/useDeliveryOptionUsageRecordListsListener';
import { useParams, useSearchParams } from 'next/navigation';
import UsageRecordTable from './UsageRecordTable';
import { searchAndOrderUsageRecords } from './searchAndOrderUsageRecords';

interface LoadUsageRecordsProps {}

const LoadUsageRecords = ({}: LoadUsageRecordsProps) => {
  const searchParams = useSearchParams();
  const params = useParams<{ deliveryOptionId: string }>();
  const { deliveryOptionId } = params;

  const { deliveryOptionUsageRecords, isLoading, error } = useDeliveryOptionUsageRecordListsListener(deliveryOptionId);

  const displayUsageRecords = searchAndOrderUsageRecords({ deliveryOptionUsageRecords, searchParams });

  return (
    <UsageRecordTable
      isLoading={isLoading}
      error={error}
      deliveryOptionUsageRecords={deliveryOptionUsageRecords}
      displayUsageRecords={displayUsageRecords}
    />
  );
};

export default LoadUsageRecords;
