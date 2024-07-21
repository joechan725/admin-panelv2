import Accordion from '@/components/ui/Accordion';
import { Address } from '@/models/Address';
import UserAddressDeleteButton from './UserAddressDeleteButton';
import UserEditAddressLink from './UserEditAddressLink';
import AdminAddressDeleteButton from './AdminAddressDeleteButton';
import AdminEditAddressLink from './AdminEditAddressLink';
import { useTranslations } from 'next-intl';

interface AddressItemProps {
  address: Address;
  mode: 'user' | 'admin';
}
const AddressItem = ({ address, mode }: AddressItemProps) => {
  const t = useTranslations('Address.address');

  const { contactName, contactPhoneNumber, detailAddress, district, id, region, remark } = address;

  return (
    <div className="flex items-center">
      <div className="flex-1">
        <Accordion
          title={
            <div>
              <div className="font-semibold text-primary-text">{remark}</div>
              <div className="font-medium text-secondary-text">{detailAddress}</div>
            </div>
          }
        >
          <div>
            <div className="font-semibold text-primary-text">{contactName}</div>
            <div>
              <span className="font-semibold text-primary-text">{t('contactNumber')}</span>
              <span className="font-medium text-secondary-text">{contactPhoneNumber}</span>
            </div>
            <div className="font-medium text-secondary-text">{detailAddress}</div>
            <div className="font-medium text-secondary-text">{district}</div>
            <div className="font-medium text-secondary-text">{region}</div>
          </div>
        </Accordion>
      </div>
      <div className="flex-0 flex gap-4 items-center">
        {mode === 'user' && (
          <>
            <UserEditAddressLink addressId={id} />
            <UserAddressDeleteButton address={address} />
          </>
        )}
        {mode === 'admin' && (
          <>
            <AdminEditAddressLink addressId={id} />
            <AdminAddressDeleteButton address={address} />
          </>
        )}
      </div>
    </div>
  );
};
export default AddressItem;
