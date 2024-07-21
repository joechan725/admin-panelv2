interface PromotionSkeletonProps {}

const PromotionSkeleton = ({}: PromotionSkeletonProps) => {
  return Array.from({ length: 5 }).map((_, index) => (
    <tr key={index} className="border-b border-gray-500/30 odd:bg-blue-50/50">
      <td className="py-2">
        <div className="bg-skeleton w-10/12 h-3" />
      </td>
      <td className="py-2">
        <div className="bg-skeleton w-full h-3 maw-w-16 sm:max-w-24 md:max-w-52" />
      </td>
      <td className="py-2">
        <div className="bg-skeleton w-full h-3 max-w-screen-md" />
      </td>
      <td className="py-2">
        <div className="space-y-1">
          <div className="bg-skeleton w-10/12 h-3" />
        </div>
      </td>
    </tr>
  ));
};

export default PromotionSkeleton;
