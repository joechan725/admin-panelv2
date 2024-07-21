interface PriceReviewSkeletonProps {}

const PriceReviewSkeleton = ({}: PriceReviewSkeletonProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="font-semibold text-slate-600">Price</div>
        <div className="flex gap-2 justify-between">
          <div className="w-24 h-3 bg-skeleton" />
          <div className="w-12 h-3 bg-skeleton" />
        </div>
        <div className="flex gap-2 justify-between">
          <div className="w-24 h-3 bg-skeleton" />
          <div className="w-12 h-3 bg-skeleton" />
        </div>
        <div className="flex gap-2 justify-between">
          <div className="w-24 h-3 bg-skeleton" />
          <div className="w-12 h-3 bg-skeleton" />
        </div>
      </div>
      <hr className="h-0.5 w-full bg-slate-600/20" />
      <div className="flex gap-2 justify-between">
        <div className="w-24 h-3 bg-skeleton" />
        <div className="w-12 h-3 bg-skeleton" />
      </div>
    </div>
  );
};

export default PriceReviewSkeleton;
