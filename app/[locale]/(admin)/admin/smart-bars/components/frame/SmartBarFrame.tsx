'use client';

import BoxButton from '@/components/form/BoxButton';
import Plus from '@/components/icon/Plus';
import ItemsPerPageSelector from '@/components/search/ItemsPerPageSelector';
import PrintContainer from '@/components/search/PrintContainer';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import { Link } from '@/navigation';
import { Suspense, useState } from 'react';
import SmartBarsDeleteButton from '../list/SmartBarsDeleteButton';
import LoadSmartBars from '../list/LoadSmartBars';
import { SmartBarIdAndIsPublic } from '@/lib/hooks/smartBar/useSmartBar';
import { useTranslations } from 'next-intl';

interface SmartBarFrameProps {}

const SmartBarFrame = ({}: SmartBarFrameProps) => {
  const t = useTranslations('SmartBar.list');

  const [selectedSmartBars, setSelectedSmartBars] = useState<SmartBarIdAndIsPublic[]>([]);
  const handleSelect = ({ smartBarId, originalIsPublic }: SmartBarIdAndIsPublic) => {
    if (selectedSmartBars.some((object) => object.smartBarId === smartBarId)) {
      setSelectedSmartBars((prevObjects) => prevObjects.filter((prevObject) => prevObject.smartBarId !== smartBarId));
      return;
    }
    setSelectedSmartBars((prevObjects) => [...prevObjects, { smartBarId, originalIsPublic }]);
  };
  const handleClearIds = () => {
    setSelectedSmartBars([]);
  };

  return (
    <PrintContainer
      heading={
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="max-w-96">
              <SearchQueryBarSuspense />
            </div>
            <SmartBarsDeleteButton onDelete={handleClearIds} smartBarIdAndIsPublicArray={selectedSmartBars} />
          </div>
          <div>
            <ItemsPerPageSelector />
          </div>
        </div>
      }
      ending={
        <div>
          <Link href="/admin/smart-bars/create">
            <BoxButton disabled={false} type="button" theme="primary">
              <Plus sizeClassName="size-4" />
              {t('new')}
            </BoxButton>
          </Link>
        </div>
      }
    >
      <Suspense>
        <LoadSmartBars onSelect={handleSelect} selectedSmartBars={selectedSmartBars} />
      </Suspense>
    </PrintContainer>
  );
};

export default SmartBarFrame;
