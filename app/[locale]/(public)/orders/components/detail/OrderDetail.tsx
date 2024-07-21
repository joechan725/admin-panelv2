import { Order } from '@/models/order/Order';
import DeliveryAddressDetail from '@/components/features/order/detail/DeliveryAddressDetail';
import DeliveryOptionDetail from '@/components/features/order/detail/DeliveryOptionDetail';
import LightBorder from '@/components/layout/container/LightBorder';
import StatusHistoryList from '@/components/features/order/detail/StatusHistoryList';
import OrderedProductFrame from '@/components/features/order/orderedProductList/OrderedProductFrame';
import { Link } from '@/navigation';
import BoxButton from '@/components/form/BoxButton';
import { useSearchParams } from 'next/navigation';
import OrderStatus from '@/components/features/order/detail/OrderStatus';
import { useLocale, useTranslations } from 'next-intl';
import CouponReview from '@/components/features/order/detail/CouponReview';
import PriceReview from '@/components/features/order/detail/PriceReview';

interface OrderDetailProps {
  order: Order;
}

const OrderDetail = ({ order }: OrderDetailProps) => {
  const t = useTranslations('Order.detail');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const queryCode = searchParams.get('queryCode');

  const {
    id,
    // products
    orderItems,
    // coupons
    couponsUsed,
    // price
    amountRefunded,
    amountToPay,
    deliveryChargeAtThisOrder,
    totalPriceBeforeDiscount,
    discountAmount,
    // comment
    commentedProductIds,
    // status
    status,
    statusHistories,
    // delivery information
    isPickUp,
    deliveryRegion,
    deliveryDistrict,
    deliveryDetailAddress,
    contactName,
    contactPhoneNumber,
    addressRemark,
    storeName,
    storePhoneNumber,
    storeBusinessHours,
    // delivery option
    deliveryOptionNameEN,
    deliveryOptionNameZH,
    deliveryOptionDescriptionZH,
    deliveryOptionDescriptionEN,
    deliveryOptionDeliveryCharge,
    deliveryOptionEstimatedTimeZH,
    deliveryOptionEstimatedTimeEN,
    deliveryOptionFreeDeliveryThreshold,
    deliveryOptionDeliveryProviderZH,
    deliveryOptionDeliveryProviderEN,
  } = order;

  const deliveryOptionName = locale === 'en' ? deliveryOptionNameEN : deliveryOptionNameZH;
  const deliveryOptionDescription = locale === 'en' ? deliveryOptionDescriptionEN : deliveryOptionDescriptionZH;
  const deliveryOptionDeliveryProvider =
    locale === 'en' ? deliveryOptionDeliveryProviderEN : deliveryOptionDeliveryProviderZH;
  const deliveryOptionEstimatedTime = locale === 'en' ? deliveryOptionEstimatedTimeEN : deliveryOptionEstimatedTimeZH;

  const refundUrl =
    queryCode === null ? `/orders/${id}/refund-application` : `/orders/${id}/refund-application?queryCode=${queryCode}`;

  return (
    <>
      <div className="mx-2">
        <div className="flex items-end justify-between flex-wrap">
          <div>
            <div className="text-lg font-semibold text-primary-text">{t('title')}</div>
            <div className="font-medium text-secondary-text">#{id}</div>
          </div>
          {(amountRefunded ?? 0) < amountToPay && (
            <Link href={refundUrl}>
              <BoxButton disabled={false} theme="danger" type="button" fontSize="sm">
                {t('refundApplication')}
              </BoxButton>
            </Link>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <LightBorder className="p-6">
            <OrderedProductFrame
              orderItems={orderItems}
              orderId={id}
              mode="user"
              status={status}
              commentedProductIds={commentedProductIds}
            />
          </LightBorder>
          <LightBorder className="p-6">
            <div className="flex gap-2 mb-2">
              <div className="text-sm font-semibold text-primary-text">{t('status')}</div>
              <OrderStatus status={status} />
            </div>
            <div className="mb-4">
              <div className="font-semibold text-primary-text">{t('statusHistories')}</div>
              <StatusHistoryList
                statusHistories={statusHistories}
                deliveryProvider={deliveryOptionDeliveryProvider}
                mode="user"
              />
            </div>
          </LightBorder>
        </div>
        <div className="space-y-8">
          <LightBorder className="p-6">
            <DeliveryOptionDetail
              isPickUp={isPickUp}
              name={deliveryOptionName}
              description={deliveryOptionDescription}
              freeDeliveryThreshold={deliveryOptionFreeDeliveryThreshold}
              estimatedTime={deliveryOptionEstimatedTime}
              deliveryCharge={deliveryOptionDeliveryCharge}
              deliveryProvider={deliveryOptionDeliveryProvider}
              deliveryChargeAtThisOrder={deliveryChargeAtThisOrder}
            />
          </LightBorder>
          <LightBorder className="p-6">
            <DeliveryAddressDetail
              contactName={contactName}
              contactPhoneNumber={contactPhoneNumber}
              detailAddress={deliveryDetailAddress}
              district={deliveryDistrict}
              region={deliveryRegion}
              isPickUp={isPickUp}
              addressRemark={addressRemark}
              storeName={storeName}
              storePhoneNumber={storePhoneNumber}
              storeBusinessHours={storeBusinessHours}
            />
          </LightBorder>
          {couponsUsed && couponsUsed.length > 0 && (
            <LightBorder className="p-6">
              <CouponReview couponsUsed={couponsUsed} discountAmount={discountAmount} />
            </LightBorder>
          )}
          <LightBorder className="p-6">
            <PriceReview
              amountToPay={amountToPay}
              deliveryChargeAtThisOrder={deliveryChargeAtThisOrder}
              discountAmount={discountAmount}
              totalPriceBeforeDiscount={totalPriceBeforeDiscount}
            />
          </LightBorder>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
