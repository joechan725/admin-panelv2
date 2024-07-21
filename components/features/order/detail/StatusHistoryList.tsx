import { StatusHistory } from '@/models/order/StatusHistory';
import StatusHistoryItem from './StatusHistoryItem';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { useTranslations } from 'next-intl';

interface StatusHistoryListProps {
  statusHistories?: StatusHistory[];
  deliveryProvider?: string;
  mode: 'user' | 'admin';
}

const StatusHistoryList = ({ statusHistories, deliveryProvider, mode }: StatusHistoryListProps) => {
  const t = useTranslations('Order.detail');

  if (!statusHistories || statusHistories.length === 0) {
    return <div className="p-2 text-sm text-slate-500 font-medium">{t('noStatusHistories')}</div>;
  }

  return (
    <div className="space-y-4 p-2">
      {statusHistories.length > 0 &&
        sortObjectsByKey(statusHistories, 'updatedAt', 'asc').map((activity) => (
          <StatusHistoryItem
            key={activity.id}
            statusHistory={activity}
            deliveryProvider={deliveryProvider}
            mode={mode}
          />
        ))}
    </div>
  );
};

export default StatusHistoryList;
