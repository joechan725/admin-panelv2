interface DeliveryOptionDetailSkeletonProps {}

const DeliveryOptionDetailSkeleton = ({}: DeliveryOptionDetailSkeletonProps) => {
  return (
    <div className="space-y-5">
      <span className="w-28 h-3 bg-skeleton" />
      <div className="space-y-3">
        <div className="w-12 h-3 bg-skeleton" />
        <div className="w-24 h-3 bg-skeleton" />
        <div className="flex gap-2 items-center">
          <span className="w-28 h-3 bg-skeleton" />
          <div className="w-16 h-3 bg-skeleton" />
        </div>
        <div className="flex gap-2 items-center">
          <span className="w-28 h-3 bg-skeleton" />
          <span className="w-16 h-3 bg-skeleton" />
        </div>
        <div className="flex gap-2 items-center">
          <span className="w-28 h-3 bg-skeleton" />
          <span className="w-16 h-3 bg-skeleton" />
        </div>
        <div className="flex gap-2 items-center">
          <span className="w-28 h-3 bg-skeleton" />
          <span className="w-16 h-3 bg-skeleton" />
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptionDetailSkeleton;
