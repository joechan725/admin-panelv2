import AvatarShow from '@/components/ui/image/AvatarShow';
import { Order } from '@/models/order/Order';
import { Link } from '@/navigation';
import UserRole from '@/components/ui/UserRole';
import { useLanguage } from '@/lib/hooks/language/useLanguage';

interface UserDetailProps {
  order: Order;
}

const UserDetail = ({ order }: UserDetailProps) => {
  const { convertUserName } = useLanguage();
  const { userId, userFirstName, userLastName, userAvatar, userRole, userEmail, userPhoneNumber } = order;

  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <div className="font-semibold text-primary-text">User detail</div>
        <UserRole userRole={userRole} />
      </div>
      <div className="max-w-min">
        <Link
          className="flex gap-4 items-center group hover:opacity-85 active:opacity-70 transition-all"
          href={`/admin/users/${userId}`}
        >
          <div className="flex-0">
            <AvatarShow image={userAvatar} sizeClassName="size-10" />
          </div>
          <div className="group-hover:underline underline-offset-1">
            <div className="text-sm font-semibold text-primary-text">
              {convertUserName({ firstName: userFirstName, lastName: userLastName })}
            </div>
            <div className="text-xs font-medium text-tertiary-text">Email: {userEmail ?? 'N/A'}</div>
            <div className="text-xs font-medium text-tertiary-text">Phone: {userPhoneNumber ?? 'N/A'}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;
