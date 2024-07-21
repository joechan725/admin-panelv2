import ImageShow from '@/components/ui/image/ImageShow';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import StarBar from '@/components/ui/StarBar';

interface CartItemSkeletonProps {}
const CartItemSkeleton = ({}: CartItemSkeletonProps) => {
  const numberOfSkeleton = 3;
  return (
    <div className="relative">
      <LoadingShimmer gradient="white" />
      {Array.from({ length: numberOfSkeleton }).map((_, index) => (
        <div key={index} className="flex items-center gap-8 border-b border-gray-600/15 py-4 px-2">
          <div className="flex-0">
            <ImageShow image={undefined} sizeClassName="size-32" className="opacity-25" />
          </div>
          <div className="flex-1">
            <div className="max-w-96 flex flex-col gap-1">
              <div className="flex-1 space-y-1">
                <div className="bg-skeleton w-1/5 h-5" />
                <div className="bg-skeleton w-4/5 h-4" />
                <div className="bg-skeleton w-2/5 h-4" />
              </div>
              <div className="flex gap-1">
                <div className="bg-skeleton w-1/6 h-4" />
                <div className="bg-skeleton w-1/12 h-4" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex">
                  <StarBar activeStar={5} className="text-skeleton" />
                </div>
                <div className="bg-skeleton w-20 h-7 rounded-md" />
              </div>
            </div>
          </div>
          <div className="flex-0">
            <div className="flex flex-col items-end gap-1">
              <div className="bg-skeleton w-5 h-4 rounded-md" />
              <div className="bg-skeleton w-8 h-6 rounded-md" />
              <hr className="bg-slate-600/20 h-0.5 w-[calc(100%+10px)]" />
              <div className="flex gap-2 items-end">
                <div className="bg-skeleton w-14 h-3 rounded-md" />
                <div className="bg-skeleton w-8 h-6 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CartItemSkeleton;
