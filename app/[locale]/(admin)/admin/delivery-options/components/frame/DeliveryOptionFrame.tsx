'use client';

import BoxButton from '@/components/form/BoxButton';
import Plus from '@/components/icon/Plus';
import ItemsPerPageSelector from '@/components/search/ItemsPerPageSelector';
import PrintContainer from '@/components/search/PrintContainer';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import { Link } from '@/navigation';
import { Suspense, useState } from 'react';
import DeliveryOptionsDeleteButton from '../list/DeliveryOptionsDeleteButton';
import LoadDeliveryOptions from '../list/LoadDeliveryOptions';
import { useTranslations } from 'next-intl';

interface DeliveryOptionFrameProps {}
const DeliveryOptionFrame = ({}: DeliveryOptionFrameProps) => {
  const t = useTranslations('DeliveryOption.list');

  const [selectedDeliveryOptionIds, setSelectDeliveryOptionIds] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    if (selectedDeliveryOptionIds.includes(id)) {
      setSelectDeliveryOptionIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
      return;
    }
    setSelectDeliveryOptionIds((prevIds) => [...prevIds, id]);
  };

  const handleClearIds = () => {
    setSelectDeliveryOptionIds([]);
  };

  return (
    <PrintContainer
      heading={
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="max-w-96">
              <SearchQueryBarSuspense />
            </div>
            <DeliveryOptionsDeleteButton
              onDelete={handleClearIds}
              selectedDeliveryOptionIds={selectedDeliveryOptionIds}
            />
          </div>
          <div>
            <ItemsPerPageSelector />
          </div>
        </div>
      }
      ending={
        <Link href="/admin/delivery-options/create">
          <BoxButton disabled={false} type="button" theme="primary">
            <Plus />
            {t('new')}
          </BoxButton>
        </Link>
      }
    >
      <Suspense>
        <LoadDeliveryOptions onSelect={handleSelect} selectedDeliveryOptionIds={selectedDeliveryOptionIds} />
      </Suspense>
    </PrintContainer>
  );
};
export default DeliveryOptionFrame;
