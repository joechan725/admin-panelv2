import ImageShow from '@/components/ui/image/ImageShow';
import StarBar from '@/components/ui/StarBar';
import Heart from '@/components/icon/Heart';

interface ProductSkeletonProps {}

const ProductSkeleton = ({}: ProductSkeletonProps) => {
  return Array.from({ length: 8 }).map((_, index) => (
    <div key={index} className="max-w-sm w-full rounded-md shadow-lg bg-white flex flex-col">
      <div className="flex-1 flex flex-col w-full px-6 pt-6 group transition-all hover:opacity-85 active:opacity-70">
        <ImageShow
          image={undefined}
          sizeClassName="w-full aspect-square"
          roundedClassName="rounded-md"
          className="opacity-30"
        />
        <div className="mt-4 mb-2 flex-1">
          <div className="space-y-2">
            <div className="bg-skeleton w-7/12 h-3" />
            <div className="space-y-1">
              <div className="bg-skeleton w-8/12 h-3" />
              <div className="bg-skeleton w-12/12 h-3" />
              <div className="bg-skeleton w-5/12 h-3" />
            </div>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex flex-wrap gap-1 overflow-hidden">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-skeleton w-8 h-4" />
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-end">
          <div>
            <div className="flex items-center gap-1">
              <StarBar activeStar={5} sizeClassName="size-4" className="text-skeleton" />
              <div className="bg-skeleton w-3/12 h-3" />
            </div>
            <div className="bg-skeleton w-6/12 h-3" />
          </div>
          <div className="bg-skeleton w-3/12 h-5" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-center items-center">
          <Heart sizeClassName="size-4" className="text-skeleton" />
          <div className="bg-skeleton w-3/12 h-3" />
        </div>
        <div className="rounded-b-md bg-skeleton w-full h-10" />
      </div>
    </div>
  ));
};

export default ProductSkeleton;
