import BoxButton from '@/components/form/BoxButton';
import Plus from '@/components/icon/Plus';
import Widget from '@/components/layout/container/Widget';
import { Link } from '@/navigation';
import LoadStoreAddresses from '../list/LoadStoreAddresses';
import { Suspense } from 'react';
import { useTranslations } from 'next-intl';

interface StoreAddressFrameProps {}

const StoreAddressFrame = ({}: StoreAddressFrameProps) => {
  const t = useTranslations('Address.storeAddress');

  return (
    <Widget className="min-h-60">
      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="text-lg font-semibold text-primary-text">{t('title')}</div>
          <Link href="/admin/settings/store-addresses/create">
            <BoxButton disabled={false} theme="primary" type="button" fontSize="sm">
              <div className="flex items-center gap-2">
                <Plus className="size-4" />
                {t('add')}
              </div>
            </BoxButton>
          </Link>
        </div>
        <Suspense>
          <LoadStoreAddresses />
        </Suspense>
      </div>
    </Widget>
  );
};

export default StoreAddressFrame;
