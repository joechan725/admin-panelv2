import LoadAdminAddresses from '@/components/features/address/LoadAdminAddresses';
import Widget from '@/components/layout/container/Widget';
import { useTranslations } from 'next-intl';
import AddAddressLink from '../link/AddAddressLink';

interface AddressRootProps {}

const AddressRoot = ({}: AddressRootProps) => {
  const t = useTranslations('Address.address');

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-screen-md w-full">
        <Widget className="min-h-60">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="ml-2 text-lg font-semibold text-primary-text">{t('title')}</div>
                <AddAddressLink />
              </div>
              <hr className="h-0.5 w-full bg-primary-text/20" />
            </div>
            <LoadAdminAddresses />
          </div>
        </Widget>
      </div>
    </div>
  );
};

export default AddressRoot;
