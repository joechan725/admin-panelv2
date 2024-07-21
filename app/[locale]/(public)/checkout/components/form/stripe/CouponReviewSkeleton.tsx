interface CouponReviewSkeletonProps {}

const CouponReviewSkeleton = ({}: CouponReviewSkeletonProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="w-24 h-3 bg-skeleton" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="pl-2 flex justify-between">
              <div className="w-14 h-3 bg-skeleton" />
              <div className="w-10 h-3 bg-skeleton" />
            </div>
          ))}
        </div>
        <hr className="h-0.5 w-full bg-slate-600/20" />
        <div className="flex justify-between">
          <div className="w-24 h-3 bg-skeleton" />
          <div className="w-10 h-3 bg-skeleton" />
        </div>
      </div>
    </div>
  );
};

export default CouponReviewSkeleton;
