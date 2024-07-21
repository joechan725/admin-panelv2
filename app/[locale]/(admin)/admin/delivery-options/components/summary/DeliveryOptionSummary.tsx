'use client';

import Globe from '@/components/icon/Globe';
import PaperClip from '@/components/icon/PaperClip';
import Lock from '@/components/icon/Lock';
import Dollar from '@/components/icon/Dollar';
import { useAllHistoryStatisticListener } from '@/lib/hooks/admin/useAllHistoryStatisticListener';

interface DeliveryOptionSummaryProps {}
const DeliveryOptionSummary = ({}: DeliveryOptionSummaryProps) => {
  const { allHistoryStatistic } = useAllHistoryStatisticListener(true);

  return (
    <div className="grid grid-cols-4 divide-x divide-black/20">
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">
            {allHistoryStatistic?.totalDeliveryOptionCount ?? 0}
          </div>
          <div className="text-sm text-gray-500 font-medium">Delivery options</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <PaperClip className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">
            {allHistoryStatistic?.publicDeliveryOptionCount ?? 0}
          </div>
          <div className="text-sm text-gray-500 font-medium">Public Delivery Options</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <Globe className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">
            {allHistoryStatistic?.privateDeliveryOptionCount ?? 0}
          </div>
          <div className="text-sm text-gray-500 font-medium">Private Delivery Options</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <Lock className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{allHistoryStatistic?.deliveryCharge ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">Delivery Charge</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <Dollar className="text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeliveryOptionSummary;
