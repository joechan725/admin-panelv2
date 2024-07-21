import XMark from '@/components/icon/XMark';
import ImageShow from '@/components/ui/image/ImageShow';
import LoadingShimmer from '@/components/loading/LoadingShimmer';

interface NotificationSkeletonProps {}
const NotificationSkeleton = ({}: NotificationSkeletonProps) => {
  return (
    <div className="relative flex items-center gap-4 py-2 border-b border-slate-600/20 px-2">
      <LoadingShimmer gradient="gray" roundedClassName="rounded-none" />
      <div className="flex-0">
        <ImageShow image={undefined} sizeClassName="size-12" className="opacity-20" />
      </div>
      <div className="space-y-2 flex-1">
        <div className="bg-skeleton w-1/4 h-3.5" />
        <div className="bg-skeleton w-4/5 h-3" />
        <div className="bg-skeleton w-full h-3" />
        <div className="bg-skeleton w-3/5 h-3" />
        <div className="bg-skeleton w-2/5 h-3" />
      </div>
      <div className="flex-0">
        <button>
          <XMark sizeClassName="size-4" className="text-danger" />
        </button>
      </div>
    </div>
  );
};
export default NotificationSkeleton;
