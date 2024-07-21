interface OrderSkeletonProps {}
const OrderSkeleton = ({}: OrderSkeletonProps) => {
  return Array.from({ length: 5 }).map((_, index) => (
    <tr key={index} className="border-b border-gray-500/30 odd:bg-blue-50/50">
      {/* id */}
      <td className="py-2 px-2">
        <div className="bg-skeleton w-12 h-3" />
      </td>

      {/* user */}
      <td className="py-2">
        <div className="flex items-center gap-4">
          <div className="size-10 bg-skeleton rounded-full" />
          <div className="flex flex-col gap-1">
            <div className="bg-skeleton w-12 h-3" />
            <div className="bg-skeleton w-24 h-3" />
            <div className="bg-skeleton w-12 h-3" />
          </div>
        </div>
      </td>
      {/* status */}
      <td className="py-2 px-2">
        <div className="bg-skeleton w-12 h-3 rounded-md" />
      </td>
      {/* deliveryAddress */}
      <td className="py-2 px-2">
        <div className="flex flex-col max-w-64">
          <div className="bg-skeleton w-12 h-3" />
          <div className="bg-skeleton w-24 h-3" />
          <div className="bg-skeleton w-32 h-3" />
          <div className="bg-skeleton w-24 h-3" />
          <div className="bg-skeleton w-12 h-3" />
          <div className="bg-skeleton w-8 h-3" />
        </div>
      </td>
      {/* totalQuantity */}
      <td className="py-2 px-2">
        <div className="bg-skeleton w-5 h-3" />
      </td>
      {/* price */}
      <td className="py-2 px-2 space-y-2">
        <div className="bg-skeleton w-2/5 h-3" />
        <div className="bg-skeleton w-3 h-2" />
        <div className="bg-skeleton w-5 h-3" />
      </td>
      {/* time */}
      <td className="py-2 px-2">
        <div className="space-y-1">
          <div className="bg-skeleton w-10/12 h-3" />
          <div className="bg-skeleton w-9/12 h-3" />
        </div>
      </td>
      {/* action */}
      <td className="py-2 px-2">
        <div className="flex gap-2">
          <div className="bg-skeleton size-5 rounded-md" />
        </div>
      </td>
    </tr>
  ));
};

export default OrderSkeleton;
