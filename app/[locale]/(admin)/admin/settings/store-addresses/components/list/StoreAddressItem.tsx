import Edit from '@/components/icon/Edit';
import Accordion from '@/components/ui/Accordion';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { Link } from '@/navigation';
import StoreAddressDeleteButton from './StoreAddressDeleteButton';
import { StoreAddress } from '@/models/store/StoreAddress';
import IconButton from '@/components/ui/button/IconButton';
import { useTranslations } from 'next-intl';

interface StoreAddressItemProps {
  storeAddress: StoreAddress;
}

const StoreAddressItem = ({ storeAddress }: StoreAddressItemProps) => {
  const t = useTranslations('Address.storeAddress');

  const { name, phoneNumber, detailAddress, district, id, region } = storeAddress;

  return (
    <div className="flex items-center">
      <div className="flex-1">
        <Accordion
          title={
            <div>
              <div className="font-semibold text-primary-text">{name}</div>
              <div className="font-medium text-secondary-text">{detailAddress}</div>
            </div>
          }
        >
          <div>
            <div>
              <span className="font-semibold text-primary-text">{t('phoneNumber')}</span>
              <span className="font-medium text-secondary-text">{phoneNumber}</span>
            </div>
            <div className="font-medium text-secondary-text">{detailAddress}</div>
            <div className="font-medium text-secondary-text">{district}</div>
            <div className="font-medium text-secondary-text">{region}</div>
          </div>
        </Accordion>
      </div>
      <div className="flex-0 flex gap-4 items-center">
        <HoverPopup message={t('edit')}>
          <IconButton disabled={false} theme="secondary" type="button">
            <Link href={`/admin/settings/store-addresses/${id}/edit`}>
              <Edit />
            </Link>
          </IconButton>
        </HoverPopup>
        <StoreAddressDeleteButton storeAddress={storeAddress} />
      </div>
    </div>
  );
};

export default StoreAddressItem;
