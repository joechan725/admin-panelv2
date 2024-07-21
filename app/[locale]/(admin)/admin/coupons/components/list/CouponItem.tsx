import { PrivateCoupon } from '@/models/coupon/PrivateCoupon';
import CouponTogglePublic from './CouponTogglePublic';
import CouponToggleRegisteredUserOnly from './CouponToggleRegisteredUserOnly';
import CouponDeleteButton from './CouponDeleteButton';
import clsx from 'clsx/lite';
import CouponToggleCanBeUsedTogether from './CouponToggleCanBeUsedTogether';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { Link } from '@/navigation';
import Edit from '@/components/icon/Edit';
import Eye from '@/components/icon/Eye';
import { formatDate } from '@/lib/helpers/date/formatDate';
import TrBody from '@/components/table/TrBody';
import Td from '@/components/table/Td';
import IconButton from '@/components/ui/button/IconButton';
import { useTranslations } from 'next-intl';

interface CouponItemProps {
  privateCoupon: PrivateCoupon;
  isSelect?: boolean;
  onSelect?: (id: string) => void;
}
const CouponItem = ({ privateCoupon, isSelect, onSelect }: CouponItemProps) => {
  const t = useTranslations('Coupon.list');

  const {
    id,
    code,
    discountType,
    discountAmount,
    maximumDiscount,
    minimumSpend,
    usageLimit,
    usageLimitPerUser,
    usageCount,
    startDate,
    endDate,
    createdAt,
    updatedAt,
    accumulativeDiscountAmount,
  } = privateCoupon;

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

      {/* code */}
      <Td>
        <div className="text-sm font-medium text-secondary-text max-w-80 line-clamp-3 text-ellipsis">{code}</div>
      </Td>

      {/* discount type and amount */}
      <Td>
        <div
          className={clsx(
            'text-sm font-medium py-0.5 px-1 rounded-md max-w-max',
            discountType === 'fixed' && 'bg-purple-500/15 text-purple-500',
            discountType === 'percentage' && 'bg-blue-500/15 text-blue-500'
          )}
        >
          {discountType === 'fixed' && t('fixed')}
          {discountType === 'percentage' && t('percentage')}
        </div>
        <div className="text-sm font-medium text-secondary-text">
          {discountType === 'fixed' ? '$' : null}
          {discountAmount.toFixed(2)}
          {discountType === 'percentage' ? '% off' : null}
        </div>
        {maximumDiscount !== undefined && (
          <div className="text-xs font-medium text-secondary-text">
            {t('maximumDiscount')}: ${maximumDiscount.toFixed(2)}
          </div>
        )}
      </Td>

      {/* minimum spend */}
      <Td>
        <div className="text-sm font-medium text-secondary-text">{minimumSpend ? `$${minimumSpend}` : 'N/A'}</div>
      </Td>

      {/* usage limit */}
      <Td>
        <div className="text-sm font-medium text-secondary-text">{usageLimit ?? 'N/A'}</div>
      </Td>

      {/* usage limit per customer */}
      <Td>
        <div className="text-sm font-medium text-secondary-text">{usageLimitPerUser ?? 'N/A'}</div>
      </Td>

      {/* usage count */}
      <Td>
        <div className="text-sm font-medium text-secondary-text">{usageCount ?? 0}</div>
      </Td>

      {/* accumulativeDiscountAmount */}
      <Td>
        <div className="text-sm font-medium text-secondary-text">{accumulativeDiscountAmount ?? 0}</div>
      </Td>

      {/* effective time */}
      <Td>
        <div className="space-y-0.5">
          <div className="text-xs font-medium text-secondary-text">{t('startAt')}</div>
          <div className="text-xs font-semibold text-primary-text">
            {startDate ? formatDate(startDate, 'short') : 'N/A'}
          </div>
          <div className="text-xs font-medium text-secondary-text">{t('endAt')}</div>
          <div className="text-xs font-semibold text-primary-text">
            {endDate ? formatDate(endDate, 'short') : 'N/A'}
          </div>
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

      {/* registered user only? */}
      <Td>
        <CouponToggleRegisteredUserOnly privateCoupon={privateCoupon} key={crypto.randomUUID()} />
      </Td>

      {/* can be used together? */}
      <Td>
        <CouponToggleCanBeUsedTogether privateCoupon={privateCoupon} key={crypto.randomUUID()} />
      </Td>

      {/* published? */}
      <Td>
        <CouponTogglePublic privateCoupon={privateCoupon} key={crypto.randomUUID()} />
      </Td>

      {/* actions */}
      <Td>
        <div className="flex items-center gap-2">
          <HoverPopup message={t('viewDetail')}>
            <IconButton disabled={false} type="button" theme="secondary">
              <Link href={`/admin/coupons/${id}`}>
                <Eye sizeClassName="size-5" />
              </Link>
            </IconButton>
          </HoverPopup>
          <HoverPopup message={t('edit')}>
            <IconButton disabled={false} type="button" theme="secondary">
              <Link href={`/admin/coupons/${id}/edit`}>
                <Edit sizeClassName="size-5" />
              </Link>
            </IconButton>
          </HoverPopup>
          <CouponDeleteButton privateCoupon={privateCoupon} />
        </div>
      </Td>
    </TrBody>
  );
};
export default CouponItem;
