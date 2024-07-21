import LoadingShimmer from '@/components/loading/LoadingShimmer';
import AvatarShow from '@/components/ui/image/AvatarShow';
import ImageShow from '@/components/ui/image/ImageShow';
import StarBar from '@/components/ui/StarBar';

interface CommentSkeletonProps {}

const CommentSkeleton = ({}: CommentSkeletonProps) => {
  return (
    <div className="relative">
      <LoadingShimmer gradient="white" />
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-200 rounded">
          <div className="flex items-center mb-2">
            <AvatarShow image={undefined} sizeClassName="size-8 sm:size-10" />
            <div className="ml-2">
              <div className="flex xs:gap-4 md:gap-8 items-center flex-wrap">
                <div className="w-36 h-3 bg-skeleton" />
                <StarBar activeStar={5} sizeClassName="size-5 sm:size-6" className="text-skeleton" />
              </div>
              <div className="w-24 h-3 bg-skeleton" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="w-3/12 h-3 bg-skeleton" />
            <div className="w-8/12 h-3 bg-skeleton" />
            <div className="w-5/12 h-3 bg-skeleton" />
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <ImageShow
                key={index}
                image={undefined}
                sizeClassName="size-14 sm:size-20"
                roundedClassName="rounded"
                className="opacity-30"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSkeleton;
