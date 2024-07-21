import { useCouponUsageRecordListsListener } from '@/lib/hooks/coupon/usageRecord/useCouponUsageRecordListsListener';
import { useParams, useSearchParams } from 'next/navigation';
import UsageRecordTable from './UsageRecordTable';
import { searchAndOrderUsageRecords } from './searchAndOrderUsageRecords';

interface LoadUsageRecordsProps {}

const LoadUsageRecords = ({}: LoadUsageRecordsProps) => {
  const searchParams = useSearchParams();
  const params = useParams<{ couponId: string }>();
  const { couponId } = params;

  const { couponUsageRecords, isLoading, error } = useCouponUsageRecordListsListener(couponId);

  const displayUsageRecords = searchAndOrderUsageRecords({ couponUsageRecords, searchParams });

  return (
    <UsageRecordTable
      isLoading={isLoading}
      error={error}
      couponUsageRecords={couponUsageRecords}
      displayUsageRecords={displayUsageRecords}
    />
  );
};

export default LoadUsageRecords;
