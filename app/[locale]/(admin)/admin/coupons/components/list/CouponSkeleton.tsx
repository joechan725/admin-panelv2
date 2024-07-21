interface CouponSkeletonProps {}

const CouponSkeleton = ({}: CouponSkeletonProps) => {
  const total = 5;
  const _: number[] = [];
  for (let i = 0; i < total; i++) {
    _.push(i);
  }
  return (
    <tbody>
      {_.map((_) => (
        <tr key={_} className="border-b border-gray-500/30 odd:bg-blue-50/50">
          <td className="py-2">
            <div className="bg-skeleton w-10/12 h-3" />
          </td>
          <td className="py-2">
            <div className="space-y-1">
              <div className="bg-skeleton w-7/12 h-6 rounded-lg" />
              <div className="bg-skeleton w-5/12 h-3" />
            </div>
          </td>
          <td className="py-2">
            <div className="bg-skeleton w-5/12 h-3 rounded-lg" />
          </td>
          <td className="py-2">
            <div className="bg-skeleton w-5/12 h-3 rounded-lg" />
          </td>
          <td className="py-2">
            <div className="bg-skeleton w-5/12 h-3 rounded-lg" />
          </td>
          <td className="py-2">
            <div className="bg-skeleton w-5/12 h-3 rounded-lg" />
          </td>
          <td className="py-2">
            <div className="bg-skeleton w-5/12 h-3 rounded-lg" />
          </td>
          <td className="py-2">
            <div className="space-y-1">
              <div className="bg-skeleton w-10/12 h-3" />
              <div className="bg-skeleton w-9/12 h-3" />
              <div className="bg-skeleton w-10/12 h-3" />
              <div className="bg-skeleton w-9/12 h-3" />
            </div>
          </td>
          <td className="py-2">
            <div className="space-y-1">
              <div className="bg-skeleton w-10/12 h-3" />
              <div className="bg-skeleton w-9/12 h-3" />
              <div className="bg-skeleton w-10/12 h-3" />
              <div className="bg-skeleton w-9/12 h-3" />
            </div>
          </td>
          <td className="py-2">
            <div className="bg-skeleton w-10 h-5 rounded-full" />
          </td>
          <td className="py-2">
            <div className="bg-skeleton w-10 h-5 rounded-full" />
          </td>
          <td className="py-2">
            <div className="bg-skeleton w-10 h-5 rounded-full" />
          </td>
          <td className="py-2">
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

export default CouponSkeleton;
