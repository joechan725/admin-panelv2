import Th from '@/components/table/Th';
import TrHead from '@/components/table/TrHead';
import { DeliveryOptionUsageRecord } from '@/models/deliveryOption/usageRecord/DeliveryOptionUsageRecord';
import DeliveryOptionUsageRecordList from './DeliveryOptionUsageRecordList';
import PaginationIndicatorClient from '@/components/search/PaginationIndicatorClient';
import PaginationClient from '@/components/search/PaginationClient';
import { useTranslations } from 'next-intl';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface UsageRecordTableProps {
  isLoading: boolean;
  error?: string;
  deliveryOptionUsageRecords: DeliveryOptionUsageRecord[];
  displayUsageRecords: DeliveryOptionUsageRecord[];
}

const UsageRecordTable = ({
  isLoading,
  error,
  deliveryOptionUsageRecords,
  displayUsageRecords,
}: UsageRecordTableProps) => {
  const t = useTranslations('DeliveryOption.detailList');

  return (
    <div>
      <div className="overflow-y-auto scrollbar max-h-96">
        <table className="w-full">
          <thead>
            <TrHead>
              {/* User */}
              <Th searchParamsValue="user">{t('user')}</Th>
              {/* orderedAt */}
              <Th searchParamsValue="orderedAt">{t('orderedAt')}</Th>
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
              {/* deliveryCharge */}
              <Th searchParamsValue="deliveryCharge">{t('deliveryCharge')}</Th>
            </TrHead>
          </thead>
          <tbody>
            <DeliveryOptionUsageRecordList deliveryOptionUsageRecords={displayUsageRecords} />
          </tbody>
        </table>
      </div>
      {!isLoading && (!deliveryOptionUsageRecords || deliveryOptionUsageRecords.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItems')}</div>
      )}
      {!isLoading &&
        deliveryOptionUsageRecords &&
        deliveryOptionUsageRecords.length > 0 &&
        (!displayUsageRecords || displayUsageRecords.length === 0) && (
          <div className="p-2 text-sm font-medium text-secondary-text">{t('noItemsMatchSearching')}</div>
        )}
      <ErrorTranslation error={error} />
      <div className="flex justify-between items-center mt-4">
        <PaginationIndicatorClient
          itemName={t('indicator')}
          itemsLength={deliveryOptionUsageRecords.length}
          itemsPerPage={10}
          searchParamsKey="p"
        />
        <PaginationClient
          theme="primary"
          itemsLength={deliveryOptionUsageRecords.length}
          itemsPerPage={10}
          searchParamsKey="p"
        />
      </div>
    </div>
  );
};

export default UsageRecordTable;
