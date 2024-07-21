interface UserCommentSkeletonProps {}

const UserCommentSkeleton = ({}: UserCommentSkeletonProps) => {
  return (
    <tbody>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="border-b border-gray-500/30 odd:bg-blue-50/50">
          {/* product */}
          <td className="p-2">
            <div className="flex items-center gap-4">
              <div className="size-10 bg-skeleton rounded-full" />
              <div className="flex flex-col gap-1">
                <div className="bg-skeleton w-12 h-3" />
                <div className="bg-skeleton w-24 h-3" />
                <div className="bg-skeleton w-12 h-3" />
              </div>
            </div>
          </td>

          {/* comment */}
          <td className="p-2">
            <div className="bg-skeleton w-10/12 h-3" />
            <div className="bg-skeleton w-9/12 h-3" />
            <div className="bg-skeleton w-10/12 h-3" />
            <div className="bg-skeleton w-9/12 h-3" />
          </td>

          {/* time */}
          <td className="py-2 px-2">
            <div className="space-y-1">
              <div className="bg-skeleton w-10/12 h-3" />
              <div className="bg-skeleton w-9/12 h-3" />
              <div className="bg-skeleton w-10/12 h-3" />
              <div className="bg-skeleton w-9/12 h-3" />
            </div>
          </td>

          {/* action */}
          <td className="py-2 px-2">
            <div className="flex gap-2">
              <div className="bg-skeleton size-5 rounded-md" />
              <div className="bg-skeleton size-5 rounded-md" />
              <div className="bg-skeleton size-5 rounded-md" />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default UserCommentSkeleton;
