interface UserSkeletonProps {}

const UserSkeleton = ({}: UserSkeletonProps) => {
  return Array.from({ length: 5 }).map((_, index) => (
    <tr key={index} className="border-b border-gray-500/30 odd:bg-blue-50/50">
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
      <td className="py-2">
        <div className="bg-skeleton w-3/5 h-3" />
      </td>
      <td className="py-2">
        <div className="bg-skeleton w-3/5 h-3" />
      </td>
      <td className="py-2">
        <div className="bg-skeleton w-2/5 h-3" />
      </td>
      <td className="py-2">
        <div className="bg-skeleton w-1/5 h-3" />
      </td>
      <td className="py-2">
        <div className="bg-skeleton w-1/5 h-3" />
      </td>
      <td className="py-2">
        <div className="bg-skeleton w-1/5 h-3" />
      </td>
      <td className="py-2 px-2">
        <div className="flex gap-2">
          <div className="bg-skeleton size-5 rounded-md" />
          <div className="bg-skeleton size-5 rounded-md" />
        </div>
      </td>
      <td className="py-2 px-2">
        <div className="flex gap-2">
          <div className="bg-skeleton size-5 rounded-md" />
          <div className="bg-skeleton size-5 rounded-md" />
        </div>
      </td>
    </tr>
  ));
};

export default UserSkeleton;
