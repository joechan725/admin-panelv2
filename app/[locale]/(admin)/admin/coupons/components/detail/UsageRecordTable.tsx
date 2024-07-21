import Th from '@/components/table/Th';
import TrHead from '@/components/table/TrHead';
import { CouponUsageRecord } from '@/models/coupon/usageRecord/CouponUsageRecord';
import CouponUsageRecordList from './CouponUsageRecordList';
import PaginationIndicatorClient from '@/components/search/PaginationIndicatorClient';
import PaginationClient from '@/components/search/PaginationClient';
import { useTranslations } from 'next-intl';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface UsageRecordTableProps {
  isLoading: boolean;
  error?: string;
  couponUsageRecords: CouponUsageRecord[];
  displayUsageRecords: CouponUsageRecord[];
}

const UsageRecordTable = ({ isLoading, error, couponUsageRecords, displayUsageRecords }: UsageRecordTableProps) => {
  const t = useTranslations('Coupon.detailList');

  return (
    <div>
      <div className="overflow-y-auto scrollbar max-h-96">
        <table className="w-full">
          <thead>
            <TrHead>
              {/* User */}
              <Th searchParamsValue="user">{t('user')}</Th>
              {/* usedAt */}
              <Th searchParamsValue="usedAt">{t('usedAt')}</Th>
              {/* orderId */}
              <Th searchParamsValue="orderId">{t('orderId')}</Th>
              {/* totalPriceBeforeDiscount */}
              <Th searchParamsValue="totalPriceBeforeDiscount">
                <div>{t('totalPrice')}</div>
                <div className="text-sm">({t('beforeDiscount')})</div>
              </Th>
              {/* totalPriceAfterDiscount */}
              <Th searchParamsValue="totalPriceAfterDiscount">
                <div>{t('totalPrice')}</div>
                <div className="text-sm">({t('afterDiscount')})</div>
              </Th>
              {/* discount */}
              <Th searchParamsValue="discount">{t('discount')}</Th>
            </TrHead>
          </thead>
          <tbody>
            <CouponUsageRecordList couponUsageRecords={displayUsageRecords} />
          </tbody>
        </table>
      </div>
      {!isLoading && (!couponUsageRecords || couponUsageRecords.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItems')}</div>
      )}
      {!isLoading &&
        couponUsageRecords &&
        couponUsageRecords.length > 0 &&
        (!displayUsageRecords || displayUsageRecords.length === 0) && (
          <div className="p-2 text-sm font-medium text-secondary-text">{t('noItemsMatchSearching')}</div>
        )}
      <ErrorTranslation error={error} />
      <div className="flex justify-between items-center mt-4">
        <PaginationIndicatorClient
          itemName={t('indicator')}
          itemsLength={couponUsageRecords.length}
          itemsPerPage={10}
          searchParamsKey="p"
        />
        <PaginationClient
          theme="primary"
          itemsLength={couponUsageRecords.length}
          itemsPerPage={10}
          searchParamsKey="p"
        />
      </div>
    </div>
  );
};

export default UsageRecordTable;
