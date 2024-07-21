import ImageShow from '@/components/ui/image/ImageShow';

interface UserOrderSkeletonProps {}

const UserOrderSkeleton = ({}: UserOrderSkeletonProps) => {
  return Array.from({ length: 5 }).map((_, index) => (
    <tr key={index} className="border-b border-slate-900/10 even:bg-gray-50/50">
      {/* id */}
      <td className="p-2">
        <div className="bg-skeleton w-32 h-3" />
      </td>

      {/* status */}
      <td className="p-2">
        <div className="rounded-md bg-skeleton w-3/5 h-4" />
      </td>

      {/* address */}
      <td className="p-2">
        <div className="space-y-1">
          <div className="bg-skeleton w-10/12 h-3" />
          <div className="bg-skeleton w-9/12 h-3" />
          <div className="bg-skeleton w-10/12 h-3" />
          <div className="bg-skeleton w-9/12 h-3" />
          <div className="bg-skeleton w-10/12 h-3" />
          <div className="bg-skeleton w-9/12 h-3" />
        </div>
      </td>

      {/* orderItems */}
      <td className="p-2">
        <div className="flex gap-2 items-center">
          <ImageShow image={undefined} className="opacity-40" sizeClassName="size-8" />
          <div className="space-y-1 w-full">
            <div className="bg-skeleton w-3/5 h-3" />
            <div className="bg-skeleton w-3/5 h-3" />
          </div>
        </div>
      </td>

      {/* price */}
      <td className="p-2">
        <div className="bg-skeleton w-3/5 h-4" />
      </td>

      {/* time */}
      <td className="p-2">
        <div className="space-y-1">
          <div className="bg-skeleton w-10/12 h-3" />
          <div className="bg-skeleton w-9/12 h-3" />
        </div>
      </td>

      {/* actions */}
      <td className="px-2 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="bg-skeleton size-5 rounded-md" />
            <div className="bg-skeleton size-5 rounded-md" />
          </div>
        </div>
      </td>
    </tr>
  ));
};

export default UserOrderSkeleton;
