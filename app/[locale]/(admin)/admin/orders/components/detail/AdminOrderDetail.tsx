import Widget from '@/components/layout/container/Widget';
import { Order } from '@/models/order/Order';
import DeliveryOptionDetail from '@/components/features/order/detail/DeliveryOptionDetail';
import UserDetail from '@/components/features/order/detail/UserDetail';
import StatusHistoryList from '@/components/features/order/detail/StatusHistoryList';
import OrderStatus from '@/components/features/order/detail/OrderStatus';
import { Link } from '@/navigation';
import BoxButton from '@/components/form/BoxButton';
import Plus from '@/components/icon/Plus';
import OrderedProductFrame from '@/components/features/order/orderedProductList/OrderedProductFrame';
import DeliveryAddressDetail from '@/components/features/order/detail/DeliveryAddressDetail';
import { useLocale, useTranslations } from 'next-intl';
import PriceReview from '@/components/features/order/detail/PriceReview';
import CouponReview from '@/components/features/order/detail/CouponReview';

interface AdminOrderDetailProps {
  order: Order;
}

const AdminOrderDetail = ({ order }: AdminOrderDetailProps) => {
  const t = useTranslations('Order.adminDetail');
  const locale = useLocale();

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
    deliveryOptionNameZH,
    deliveryOptionNameEN,
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

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="mx-2">
          <div className="text-2xl text-slate-700 font-semibold">{t('title')}</div>
          <div className="text-gray-500 font-medium">#{id}</div>
        </div>
        <div className="flex justify-between items-center mx-2 flex-wrap">
          <Link href={`/admin/orders/${id}/edit-information`}>
            <BoxButton disabled={false} theme="primary" type="button" fontSize="sm">
              {t('editInformation')}
            </BoxButton>
          </Link>
          {(amountRefunded ?? 0) < amountToPay && (
            <Link href={`/admin/orders/${id}/refund`}>
              <BoxButton disabled={false} theme="danger" type="button" fontSize="sm">
                {t('refund')}
              </BoxButton>
            </Link>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Widget>
            <OrderedProductFrame orderItems={orderItems} mode="admin" orderId={id} />
            <div className="flex justify-end mt-2">
              <Link href={`/admin/orders/${id}/add-products`}>
                <BoxButton disabled={false} theme="primary" type="button" fontSize="sm">
                  <div className="flex gap-2 items-center">
                    <Plus sizeClassName="size-4" />
                    {t('addProducts')}
                  </div>
                </BoxButton>
              </Link>
            </div>
          </Widget>
          <Widget>
            <div className="mb-4">
              <div className="flex gap-2">
                <div className="text-sm font-semibold text-primary-text">{t('status')}</div>
                <OrderStatus status={status} />
              </div>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-primary-text">{t('statusHistories')}</div>
                <Link href={`/admin/orders/${id}/edit-status`}>
                  <BoxButton disabled={false} theme="primary" type="button" fontSize="sm">
                    {t('editStatus')}
                  </BoxButton>
                </Link>
              </div>
              <StatusHistoryList
                statusHistories={statusHistories}
                deliveryProvider={deliveryOptionDeliveryProvider}
                mode="admin"
              />
            </div>
          </Widget>
        </div>
        <div className="space-y-8">
          <Widget>
            <UserDetail order={order} />
          </Widget>
          <Widget>
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
          </Widget>
          <Widget>
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
          </Widget>
          {couponsUsed && couponsUsed.length > 0 && (
            <Widget>
              <CouponReview couponsUsed={couponsUsed} discountAmount={discountAmount} />
            </Widget>
          )}
          <Widget>
            <PriceReview
              amountToPay={amountToPay}
              deliveryChargeAtThisOrder={deliveryChargeAtThisOrder}
              discountAmount={discountAmount}
              totalPriceBeforeDiscount={totalPriceBeforeDiscount}
            />
          </Widget>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
