import BankNotes from '@/components/icon/BankNotes';
import Cube from '@/components/icon/Cube';
import Dollar from '@/components/icon/Dollar';
import Ticket from '@/components/icon/Ticket';
import AvatarShow from '@/components/ui/image/AvatarShow';
import Globe from '@/components/icon/Globe';
import LoadingShimmer from '@/components/loading/LoadingShimmer';

interface UserProfileSkeletonProps {}

const UserProfileSkeleton = ({}: UserProfileSkeletonProps) => {
  return (
    <div className="flex flex-col items-center mt-4 gap-6 w-full relative">
      <LoadingShimmer gradient="white" />
      <div className="flex flex-col items-center gap-4 w-[500px]">
        <AvatarShow image={undefined} sizeClassName="size-24" />
        <div className="flex flex-col items-center gap-2">
          <div className="h-4 w-32 bg-skeleton" />
          <div className="h-3 w-24 bg-skeleton" />
        </div>
        <div className="flex justify-between gap-2 w-full">
          <div className="flex flex-col gap-4 items-start">
            {/* Order count */}
            <div className="flex gap-2 items-center">
              <div>
                <div className="p-1.5 bg-slate-300/50 rounded-md">
                  <Cube sizeClassName="size-7" className="text-slate-500" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-3 w-5 bg-skeleton" />
                <div className="h-3 w-5 bg-skeleton" />
              </div>
            </div>
            {/* Coupon count */}
            <div className="flex gap-2 items-center">
              <div>
                <div className="p-1.5 bg-slate-300/50 rounded-md">
                  <BankNotes sizeClassName="size-7" className="text-slate-500" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-3 w-5 bg-skeleton" />
                <div className="h-3 w-5 bg-skeleton" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-start">
            {/* Total Spent */}
            <div className="flex gap-2 items-center">
              <div>
                <div className="p-1.5 bg-slate-300/50 rounded-md">
                  <Dollar sizeClassName="size-7" className="text-slate-500" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-3 w-5 bg-skeleton" />
                <div className="h-3 w-5 bg-skeleton" />
              </div>
            </div>
            {/* Total Discount */}
            <div className="flex gap-2 items-center">
              <div>
                <div className="p-1.5 bg-slate-300/50 rounded-md">
                  <Ticket sizeClassName="size-7" className="text-slate-500" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-3 w-5 bg-skeleton" />
                <div className="h-3 w-5 bg-skeleton" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-0.5 bg-black/20" />
      <div className="w-[500px] space-y-2">
        <div className="flex gap-2 items-center">
          <div className="h-4 w-10 bg-skeleton inline-block" />
          <div className="h-4 w-28 bg-skeleton inline-block" />
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-4 w-10 bg-skeleton inline-block" />
          <div className="h-4 w-36 bg-skeleton inline-block" />
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-4 w-10 bg-skeleton inline-block" />
          <div className="h-4 w-20 bg-skeleton inline-block" />
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-4 w-10 bg-skeleton inline-block" />
          <div className="h-4 w-20 bg-skeleton inline-block" />
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-4 w-10 bg-skeleton inline-block" />
          <div className="h-4 w-16 bg-skeleton inline-block" />
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-4 w-10 bg-skeleton inline-block" />
          <div className="h-4 w-16 bg-skeleton inline-block" />
        </div>
        <div className="flex items-center gap-1">
          <div className="h-4 w-10 bg-skeleton inline-block" />
          <div className="flex gap-2 items-center">
            <div className="p-0.5 rounded-full bg-gray-200/50">
              <Globe sizeClassName="size-5" className="text-gray-500" />
            </div>
            <div className="h-4 w-20 bg-skeleton inline-block" />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-4 w-16 bg-skeleton inline-block" />
          <div className="h-4 w-28 bg-skeleton inline-block" />
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-4 w-16 bg-skeleton inline-block" />
          <div className="h-4 w-28 bg-skeleton inline-block" />
        </div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
