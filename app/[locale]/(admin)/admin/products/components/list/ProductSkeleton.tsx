interface ProductSkeletonProps {}

const ProductSkeleton = ({}: ProductSkeletonProps) => {
  return Array.from({ length: 5 }).map((_, index) => (
    <tr key={index} className="border-b border-gray-500/30 odd:bg-blue-50/50">
      <td className="py-2 px-2">
        <div className="flex items-center gap-4">
          <div className="size-16 bg-skeleton rounded-md" />
          <div className="flex flex-col space-y-2">
            <div className="bg-skeleton w-12 h-3" />
            <div className="bg-skeleton w-24 h-3" />
          </div>
        </div>
      </td>
      <td className="py-2 px-2">
        <div className="bg-skeleton w-3/5 h-3" />
      </td>
      <td className="py-2 px-2">
        <div className="bg-skeleton w-3/5 h-3" />
      </td>
      <td className="py-2 px-2">
        <div className="bg-skeleton w-3/5 h-3" />
      </td>
      <td className="py-2 px-2 space-y-2">
        <div className="bg-skeleton w-2/5 h-3" />
        <div className="bg-skeleton w-3/5 h-4" />
      </td>
      <td className="py-2 px-2">
        <div className="bg-skeleton w-2/5 h-3" />
      </td>
      <td className="py-2 px-2 flex flex-wrap gap-1 overflow-hidden max-w-36">
        <div className="bg-skeleton w-5/12 h-6 inline-block rounded-sm" />
        <div className="bg-skeleton w-6/12 h-6 inline-block rounded-sm" />
        <div className="bg-skeleton w-7/12 h-6 inline-block rounded-sm" />
        <div className="bg-skeleton w-4/12 h-6 inline-block rounded-sm" />
        <div className="bg-skeleton w-4/12 h-6 inline-block rounded-sm" />
        <div className="bg-skeleton w-4/12 h-6 inline-block rounded-sm" />
      </td>
      <td className="py-2 px-2">
        <div className="bg-skeleton w-2/5 h-3" />
      </td>
      <td className="py-2 px-2">
        <div className="bg-skeleton w-2/5 h-3" />
      </td>
      <td className="py-2 px-2 space-x-2">
        <div className="bg-skeleton w-8 h-3 inline-block" />
        <div className="bg-skeleton w-6 h-2.5 inline-block" />
      </td>
      <td className="py-2 px-2">
        <div className="space-y-1">
          <div className="bg-skeleton w-10/12 h-3" />
          <div className="bg-skeleton w-9/12 h-3" />
          <div className="bg-skeleton w-10/12 h-3" />
          <div className="bg-skeleton w-9/12 h-3" />
        </div>
      </td>
      <td className="py-2 px-2">
        <div className="bg-skeleton w-10 h-5 rounded-full" />
      </td>
      <td className="py-2 px-2">
        <div className="flex gap-2">
          <div className="bg-skeleton size-5 rounded-md" />
          <div className="bg-skeleton size-5 rounded-md" />
          <div className="bg-skeleton size-5 rounded-md" />
        </div>
      </td>
    </tr>
  ));
};

export default ProductSkeleton;
