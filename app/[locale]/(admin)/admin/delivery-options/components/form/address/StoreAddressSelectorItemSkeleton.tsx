import LoadingShimmer from '@/components/loading/LoadingShimmer';

interface StoreAddressSelectorItemSkeletonProps {}

const StoreAddressSelectorItemSkeleton = ({}: StoreAddressSelectorItemSkeletonProps) => {
  return (
    <div className="relative border-2 border-slate-500/20 rounded-md px-8 py-3 space-y-1">
      <LoadingShimmer gradient="white" />
      <div className="bg-skeleton w-2/12 h-4" />
      <div className="bg-skeleton w-5/12 h-4" />
      <div className="flex gap-2">
        <div className="bg-skeleton w-3/12 h-4" />
        <div className="bg-skeleton w-3/12 h-4" />
      </div>
      <div className="bg-skeleton w-11/12 h-4" />
      <div className="bg-skeleton w-7/12 h-4" />
    </div>
  );
};

export default StoreAddressSelectorItemSkeleton;
