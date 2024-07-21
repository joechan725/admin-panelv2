import { PrivateDeliveryOption } from '@/models/deliveryOption/PrivateDeliveryOption';
import DeliveryOptionTogglePublic from './DeliveryOptionTogglePublic';
import DeliveryOptionToggleApplyThresholdBeforeCoupons from './DeliveryOptionToggleApplyThresholdBeforeCoupons';
import DeliveryOptionDeleteButton from './DeliveryOptionDeleteButton';
import { Link } from '@/navigation';
import Edit from '@/components/icon/Edit';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import Eye from '@/components/icon/Eye';
import { formatDate } from '@/lib/helpers/date/formatDate';
import TrBody from '@/components/table/TrBody';
import Td from '@/components/table/Td';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import IconButton from '@/components/ui/button/IconButton';
import { useLocale, useTranslations } from 'next-intl';

interface DeliveryOptionItemProps {
  privateDeliveryOption: PrivateDeliveryOption;
  isSelect?: boolean;
  onSelect?: (id: string) => void;
}

const DeliveryOptionItem = ({ privateDeliveryOption, isSelect, onSelect }: DeliveryOptionItemProps) => {
  const t = useTranslations('DeliveryOption.list');
  const locale = useLocale();
  const {
    id,
    nameZH,
    nameEN,
    descriptionZH,
    descriptionEN,
    deliveryProviderZH,
    deliveryProviderEN,
    estimatedTimeZH,
    estimatedTimeEN,
    deliveryCharge,
    freeDeliveryThreshold,
    usageCount,
    accumulativeDeliveryCharge,
    createdAt,
    updatedAt,
  } = privateDeliveryOption;

  const name = locale === 'en' ? nameEN : nameZH;
  const description = locale === 'en' ? descriptionEN : descriptionZH;
  const deliveryProvider = locale === 'en' ? deliveryProviderEN : deliveryProviderZH;
  const estimatedTime = locale === 'en' ? estimatedTimeEN : estimatedTimeZH;

  return (
    <TrBody>
      {onSelect && (
        <Td>
          <input
            type="checkbox"
            checked={isSelect}
            onClick={() => (onSelect ? onSelect(id) : null)}
            className="size-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 focus:ring"
          />
        </Td>
      )}

      {/* name, description, delivery provider and estimated time */}
      <Td>
        <div>
          <div className="max-w-96 line-clamp-1 text-ellipsis">
            <span className="text-sm font-semibold text-primary-text">{t('name')}</span>
            <span className="text-sm font-medium text-secondary-text">{name}</span>
          </div>
          <div className="text-sm font-medium text-secondary-text max-w-96 line-clamp-3 text-ellipsis">
            <span className="text-sm font-semibold text-primary-text">{t('description')}</span>
            <span className="text-sm font-medium text-secondary-text">{splitNewLine(description) ?? 'N/A'}</span>
          </div>
          {deliveryProvider !== undefined && (
            <div className="max-w-96 line-clamp-1 text-ellipsis">
              <span className="text-sm font-semibold text-primary-text">{t('deliveryProvider')}</span>
              <span className="text-sm font-medium text-secondary-text">{deliveryProvider}</span>
            </div>
          )}
          {estimatedTime !== undefined && (
            <div className="max-w-96 line-clamp-1 text-ellipsis">
              <span className="text-sm font-semibold text-primary-text">{t('estimatedTime')}</span>
              <span className="text-sm font-medium text-secondary-text">{estimatedTime}</span>
            </div>
          )}
        </div>
      </Td>

      {/* deliveryCharge */}
      <Td>
        <div className="text-sm font-medium text-secondary-text">
          {!deliveryCharge || deliveryCharge === 0 ? t('free') : `$${deliveryCharge}`}
        </div>
      </Td>

      {/* freeDeliveryThreshold */}
      <Td>
        <div className="text-sm font-medium text-secondary-text">
          {!freeDeliveryThreshold || freeDeliveryThreshold === 0 ? 'N/A' : `$${freeDeliveryThreshold}`}
        </div>
      </Td>

      {/* apply threshold before coupons? */}
      <Td>
        <DeliveryOptionToggleApplyThresholdBeforeCoupons
          privateDeliveryOptions={privateDeliveryOption}
          key={crypto.randomUUID()}
        />
      </Td>

      {/* published? */}
      <Td>
        <DeliveryOptionTogglePublic privateDeliveryOptions={privateDeliveryOption} key={crypto.randomUUID()} />
      </Td>

      {/* usageCount */}
      <Td>
        <div className="text-sm font-medium text-secondary-text">{usageCount ?? 0}</div>
      </Td>

      {/* accumulativeDeliveryCharge */}
      <Td>
        <div className="text-sm font-medium text-secondary-text">
          ${accumulativeDeliveryCharge ? accumulativeDeliveryCharge.toFixed(1) : 0}
        </div>
      </Td>

      {/* time */}
      <Td>
        <div className="space-y-0.5">
          <div className="text-xs font-medium text-secondary-text">{t('updatedAt')}</div>
          <div className="text-xs font-semibold text-primary-text">
            {updatedAt ? formatDate(updatedAt, 'short') : 'N/A'}
          </div>
          <div className="text-xs font-medium text-secondary-text">{t('createdAt')}</div>
          <div className="text-xs font-semibold text-primary-text">
            {createdAt ? formatDate(createdAt, 'short') : 'N/A'}
          </div>
        </div>
      </Td>

      {/* actions */}
      <Td>
        <div className="flex items-center gap-2">
          <HoverPopup message={t('viewDetail')}>
            <IconButton type="button" disabled={false} theme="secondary">
              <Link href={`/admin/delivery-options/${id}`}>
                <Eye sizeClassName="size-5" />
              </Link>
            </IconButton>
          </HoverPopup>
          <HoverPopup message={t('edit')}>
            <IconButton type="button" disabled={false} theme="secondary">
              <Link href={`/admin/delivery-options/${id}/edit`}>
                <Edit sizeClassName="size-5" />
              </Link>
            </IconButton>
          </HoverPopup>
          <DeliveryOptionDeleteButton privateDeliveryOption={privateDeliveryOption} />
        </div>
      </Td>
    </TrBody>
  );
};
export default DeliveryOptionItem;
