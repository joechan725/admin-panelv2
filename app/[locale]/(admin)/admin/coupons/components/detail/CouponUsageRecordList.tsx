import { CouponUsageRecord } from '@/models/coupon/usageRecord/CouponUsageRecord';
import CouponUsageRecordItem from './CouponUsageRecordItem';

interface CouponUsageRecordListProps {
  couponUsageRecords: CouponUsageRecord[];
}
const CouponUsageRecordList = ({ couponUsageRecords }: CouponUsageRecordListProps) => {
  return (
    couponUsageRecords &&
    couponUsageRecords.length > 0 &&
    couponUsageRecords.map((record) => <CouponUsageRecordItem key={record.id} couponUsageRecord={record} />)
  );
};
export default CouponUsageRecordList;
