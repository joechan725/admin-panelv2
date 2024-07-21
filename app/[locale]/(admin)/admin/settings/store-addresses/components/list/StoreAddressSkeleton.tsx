import LoadingShimmer from '@/components/loading/LoadingShimmer';
import Accordion from '@/components/ui/Accordion';

interface StoreAddressSkeletonProps {}

const StoreAddressSkeleton = ({}: StoreAddressSkeletonProps) => {
  return (
    <div className="relative">
      <LoadingShimmer gradient="white" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div className="flex-1">
              <Accordion
                title={
                  <div className="space-y-1">
                    <div className="bg-skeleton w-1/5 h-4" />
                    <div className="bg-skeleton w-3/5 h-4" />
                  </div>
                }
              >
                <div className="space-y-2">
                  <div className="bg-skeleton w-1/5 h-4" />
                  <div className="flex gap-2">
                    <span className="bg-skeleton w-1/5 h-4" />
                    <span className="bg-skeleton w-1/5 h-4" />
                  </div>
                  <div className="bg-skeleton w-3/5 h-4" />
                  <div className="bg-skeleton w-2/5 h-4" />
                  <div className="bg-skeleton w-1/5 h-4" />
                </div>
              </Accordion>
            </div>
            <div className="flex-0 flex gap-4 items-center">
              <div className="bg-skeleton size-6 rounded-md" />
              <div className="bg-skeleton size-6 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreAddressSkeleton;
