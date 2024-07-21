interface DeliveryOptionSkeletonProps {}
const DeliveryOptionSkeleton = ({}: DeliveryOptionSkeletonProps) => {
  return Array.from({ length: 5 }).map((_, index) => (
    <tr key={index} className="border-b border-gray-500/30 odd:bg-blue-50/50">
      <td className="p-2">
        <div className="bg-skeleton w-2/3 h-3 rounded-md" />
      </td>
      <td className="p-2">
        <div className="space-y-1">
          <div className="bg-skeleton w-7/12 h-3 rounded-md" />
          <div className="bg-skeleton w-11/12 h-3 rounded-md" />
          <div className="bg-skeleton w-5/12 h-3 rounded-md" />
        </div>
      </td>
      <td className="p-2">
        <div className="bg-skeleton w-5/12 h-3 rounded-lg" />
      </td>
      <td className="p-2">
        <div className="bg-skeleton w-5/12 h-3 rounded-lg" />
      </td>
      <td className="p-2">
        <div className="bg-skeleton w-10 h-5 rounded-full" />
      </td>
      <td className="p-2">
        <div className="bg-skeleton w-10 h-5 rounded-full" />
      </td>
      <td className="p-2">
        <div className="bg-skeleton w-5/12 h-3 rounded-lg" />
      </td>
      <td className="p-2">
        <div className="bg-skeleton w-5/12 h-3 rounded-lg" />
      </td>
      <td className="p-2">
        <div className="space-y-1">
          <div className="bg-skeleton w-10/12 h-3" />
          <div className="bg-skeleton w-9/12 h-3" />
          <div className="bg-skeleton w-10/12 h-3" />
          <div className="bg-skeleton w-9/12 h-3" />
        </div>
      </td>
      <td className="p-2">
        <div className="flex gap-2">
          <div className="bg-skeleton size-5 rounded-md" />
          <div className="bg-skeleton size-5 rounded-md" />
          <div className="bg-skeleton size-5 rounded-md" />
        </div>
      </td>
    </tr>
  ));
};
export default DeliveryOptionSkeleton;
