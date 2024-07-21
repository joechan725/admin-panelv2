import LightBorder from '@/components/layout/container/LightBorder';
import LoadingShimmer from '@/components/loading/LoadingShimmer';

interface OrderConfirmationSkeletonProps {}

const OrderConfirmationSkeleton = ({}: OrderConfirmationSkeletonProps) => {
  return (
    <div className="space-y-8 relative">
      <LoadingShimmer gradient="white" />
      <LightBorder>
        <div className="flex flex-col items-center gap-4">
          <div className="bg-skeleton w-2/5 h-5" />
          <div className="bg-skeleton w-7/12 h-3" />
          <div className="bg-skeleton w-3/5 h-3" />
          <div className="bg-skeleton w-2/5 h-3" />
        </div>
      </LightBorder>
      <LightBorder>
        <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x divide-y md:divide-y-0 divide-slate-600/20">
          <div className="space-y-4 px-8 py-6">
            <div className="bg-skeleton w-2/5 h-5" />
            <div className="bg-skeleton w-7/12 h-3" />
            <div className="bg-skeleton w-3/5 h-3" />
            <div className="bg-skeleton w-2/5 h-3" />
          </div>
          <div className="space-y-4 px-8 py-6">
            <div className="bg-skeleton w-2/5 h-5" />
            <div className="bg-skeleton w-7/12 h-3" />
            <div className="bg-skeleton w-3/5 h-3" />
            <div className="bg-skeleton w-2/5 h-3" />
          </div>
        </div>
      </LightBorder>

      <div className="grid grid-cols-1 md:grid-cols-14 gap-8">
        <div className="md:col-span-9">
          <LightBorder>
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="size-32 rounded-md bg-skeleton" />
                <div className="flex-1 space-y-4">
                  <div className="bg-skeleton w-2/5 h-5" />
                  <div className="bg-skeleton w-7/12 h-3" />
                  <div className="bg-skeleton w-3/5 h-3" />
                  <div className="bg-skeleton w-2/5 h-3" />
                </div>
              </div>
            </div>
          </LightBorder>
        </div>
        <div className="md:col-span-5">
          <LightBorder>
            <div className="space-y-4 w-full">
              <div className="bg-skeleton w-5/12 h-3" />
              <div className="bg-skeleton w-7/12 h-3" />
              <div className="bg-skeleton w-3/5 h-3" />
              <div className="bg-skeleton w-2/5 h-3" />
              <div className="bg-skeleton w-2/5 h-3" />
            </div>
          </LightBorder>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationSkeleton;
