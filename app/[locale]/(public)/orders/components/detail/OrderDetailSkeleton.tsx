import LightBorder from '@/components/layout/container/LightBorder';
import CartItemSkeleton from '@/components/features/cart/CartItemSkeleton';
import StatusHistorySkeleton from '@/components/features/order/detail/StatusHistorySkeleton';
import DeliveryOptionDetailSkeleton from '@/components/features/order/detail/DeliveryOptionDetailSkeleton';
import DeliveryAddressDetailSkeleton from '@/components/features/order/detail/DeliveryAddressDetailSkeleton';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import CouponReviewSkeleton from '../../../checkout/components/form/stripe/CouponReviewSkeleton';
import PriceReviewSkeleton from '../../../checkout/components/form/stripe/PriceReviewSkeleton';

interface OrderDetailSkeletonProps {}

const OrderDetailSkeleton = ({}: OrderDetailSkeletonProps) => {
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
      <LoadingShimmer gradient="white" />
      <div className="lg:col-span-2 space-y-8">
        <LightBorder className="p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="bg-skeleton w-16 h-3" />
            </div>
            <hr className="h-0.5 w-full bg-slate-600/20" />
            <div className="max-h-[650px] overflow-y-auto scrollbar scrollbar-slate">
              <CartItemSkeleton />
              <div className="flex justify-end">
                <div className="flex gap-2 justify-center items-center">
                  <span className="bg-skeleton w-16 h-3" />
                  <span className="bg-skeleton w-12 h-3" />
                </div>
              </div>
            </div>
          </div>
        </LightBorder>
        <LightBorder className="p-6">
          <div className="mb-4 space-y-4">
            <span className="bg-skeleton w-16 h-3" />
            <StatusHistorySkeleton />
          </div>
        </LightBorder>
      </div>
      <div className="space-y-8">
        <LightBorder className="p-6">
          <DeliveryOptionDetailSkeleton />
        </LightBorder>
        <LightBorder className="p-6">
          <DeliveryAddressDetailSkeleton />
        </LightBorder>
        <LightBorder className="p-6">
          <CouponReviewSkeleton />
        </LightBorder>
        <LightBorder className="p-6">
          <PriceReviewSkeleton />
        </LightBorder>
      </div>
    </div>
  );
};

export default OrderDetailSkeleton;
