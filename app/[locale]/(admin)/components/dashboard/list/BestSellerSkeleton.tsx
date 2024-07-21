interface BestSellerSkeletonProps {}

const BestSellerSkeleton = ({}: BestSellerSkeletonProps) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <tr key={i}>
      {/* Product Details */}
      <td className="p-2">
        <div className="flex items-center gap-4">
          <div className="size-16 bg-skeleton rounded-md" />
          <div className="flex flex-col space-y-2">
            <div className="bg-skeleton w-12 h-3" />
            <div className="bg-skeleton w-24 h-3" />
          </div>
        </div>
      </td>
      {/* Sales */}
      <td className="p-2">
        <div className="bg-skeleton w-2/5 h-3" />
      </td>
      {/* Revenue */}
      <td className="p-2">
        <div className="bg-skeleton w-2/5 h-3" />
      </td>
    </tr>
  ));
};

export default BestSellerSkeleton;
