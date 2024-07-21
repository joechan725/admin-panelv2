interface DeliveryAddressDetailSkeletonProps {}

const DeliveryAddressDetailSkeleton = ({}: DeliveryAddressDetailSkeletonProps) => {
  return (
    <div className="space-y-5">
      <div className="w-28 h-3 bg-skeleton" />
      <div className="space-y-3">
        <div className="w-16 h-3 bg-skeleton" />
        <div className="flex gap-2 items-center">
          <div className="w-28 h-3 bg-skeleton" />
          <div className="w-12 h-3 bg-skeleton" />
        </div>
        <div className="w-16 h-3 bg-skeleton" />
        <div className="space-y-3">
          <div className="w-10/12 h-3 bg-skeleton" />
          <div className="w-8/12 h-3 bg-skeleton" />
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressDetailSkeleton;
