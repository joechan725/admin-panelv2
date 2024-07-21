interface StatusHistorySkeletonProps {}

const StatusHistorySkeleton = ({}: StatusHistorySkeletonProps) => {
  return Array.from({ length: 3 }).map((_, index) => (
    <div key={index} className="relative group">
      <div className="absolute w-0.5 h-full -translate-x-1/2 left-0 -top-3 group-first:top-0 bg-slate-600 " />
      <div className="absolute size-2.5 bottom-0 -translate-x-1/2 rounded-full bg-slate-600 ring ring-slate-300" />
      <div className="space-y-3 ml-6">
        <div className="w-20 h-5 bg-skeleton" />
        <div className="w-3/12 h-3 bg-skeleton" />
        <div className="w-6/12 h-3 bg-skeleton" />
        <div className="flex gap-2 items-center">
          <div className="w-1/12 h-3 bg-skeleton" />
          <div className="w-3/12 h-3 bg-skeleton" />
        </div>
        <div className="w-6/12 h-3 bg-skeleton" />
        <div className="w-3/12 h-3 bg-skeleton" />
      </div>
    </div>
  ));
};

export default StatusHistorySkeleton;
