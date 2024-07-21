import clsx from 'clsx/lite';
import BankNotes from '@/components/icon/BankNotes';
import Cube from '@/components/icon/Cube';
import Dollar from '@/components/icon/Dollar';
import Ticket from '@/components/icon/Ticket';
import AvatarShow from '@/components/ui/image/AvatarShow';
import { User } from '@/models/user/User';
import UserRole from '@/components/ui/UserRole';
import { dateDiffInDays } from '@/lib/helpers/date/dateDiffInDays';
import { formatDate } from '@/lib/helpers/date/formatDate';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/lib/hooks/language/useLanguage';

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const { convertUserName } = useLanguage();
  const t = useTranslations('MyAccount.myProfile');

  const {
    firstName,
    lastName,
    role,
    avatar,
    couponUsedCount,
    email,
    emailVerified,
    dateOfBirth,
    gender,
    orderCount,
    phoneNumber,
    totalDiscountAmount,
    totalSpent,
    lastLoggedInAt,
  } = user;

  const userName = convertUserName({ firstName, lastName });
  const lastLoggedInBeforeDay = lastLoggedInAt ? dateDiffInDays(new Date(), new Date(lastLoggedInAt)) : 0;
  const status = lastLoggedInBeforeDay < 7 ? 'Active' : 'Inactive';

  return (
    <div className="flex flex-col items-center mt-4 gap-6 w-full">
      <div className="flex flex-col items-center gap-4 w-full max-w-[500px]">
        <AvatarShow image={avatar} sizeClassName="size-16 md:size-24" />
        <div className="flex flex-col items-center gap-2">
          <div className="md:text-lg font-semibold text-primary-text">{userName}</div>
          <div className="text-xs font-medium text-secondary-text">{email}</div>
        </div>
        <div className="flex justify-between gap-2 w-full">
          <div className="flex flex-col gap-4 items-start">
            {/* Order count */}
            <div className="flex gap-2 items-center">
              <div>
                <div className="p-1.5 bg-secondary-text/20 rounded-md">
                  <Cube sizeClassName="size-5 md:size-7" className="text-secondary-text" />
                </div>
              </div>
              <div>
                <div className="md:text-lg font-semibold text-primary-text">{orderCount ?? 0}</div>
                <div className="text-xs md:text-sm font-medium text-secondary-text">{t('orders')}</div>
              </div>
            </div>
            {/* Coupon count */}
            <div className="flex gap-2 items-center">
              <div>
                <div className="p-1.5 bg-secondary-text/20 rounded-md">
                  <BankNotes sizeClassName="size-5 md:size-7" className="text-secondary-text" />
                </div>
              </div>
              <div>
                <div className="md:text-lg font-semibold text-primary-text">{couponUsedCount ?? 0}</div>
                <div className="text-xs md:text-sm font-medium text-secondary-text">{t('usedCoupons')}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-start">
            {/* Total Spent */}
            <div className="flex gap-2 items-center">
              <div>
                <div className="p-1.5 bg-secondary-text/20 rounded-md">
                  <Dollar sizeClassName="size-5 md:size-7" className="text-secondary-text" />
                </div>
              </div>
              <div>
                <div className="md:text-lg font-semibold text-primary-text">
                  ${totalSpent ? totalSpent.toFixed(0) : 0}
                </div>
                <div className="text-xs md:text-sm font-medium text-secondary-text">{t('totalSpent')}</div>
              </div>
            </div>
            {/* Total Discount */}
            <div className="flex gap-2 items-center">
              <div>
                <div className="p-1.5 bg-secondary-text/20 rounded-md">
                  <Ticket sizeClassName="size-5 md:size-7" className="text-secondary-text" />
                </div>
              </div>
              <div>
                <div className="md:text-lg font-semibold text-primary-text">
                  ${totalDiscountAmount ? totalDiscountAmount.toFixed(0) : 0}
                </div>
                <div className="text-xs md:text-sm font-medium text-secondary-text">{t('discountAmount')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-0.5 bg-black/20" />
      <div className="w-full max-w-[500px] space-y-2">
        <div>
          <span className="text-xs md:text-sm font-semibold text-primary-text">{t('name')}</span>
          <span className="text-xs md:text-sm font-medium text-secondary-text">{userName}</span>
        </div>
        <div className="flex items-center">
          <div>
            <span className="text-xs md:text-sm font-semibold text-primary-text">{t('email')}</span>
            <span className="text-xs md:text-sm font-medium text-secondary-text">{email ?? 'N/A'} </span>
          </div>
          <div
            className={clsx(
              'text-xs py-0.5 px-1 rounded-md max-w-max font-medium ml-2',
              emailVerified ? 'bg-success/15 text-success' : 'bg-danger/20 text-danger'
            )}
          >
            {emailVerified ? t('verified') : t('unverified')}
          </div>
        </div>
        <div>
          <span className="text-xs md:text-sm font-semibold text-primary-text">{t('phone')} </span>
          <span className="text-xs md:text-sm font-medium text-secondary-text">{phoneNumber ?? 'N/A'}</span>
        </div>
        <div>
          <span className="text-xs md:text-sm font-semibold text-primary-text">{t('birthday')} </span>
          <span className="text-xs md:text-sm font-medium text-secondary-text">
            {dateOfBirth ? formatDate(dateOfBirth, 'short') : 'N/A'}
          </span>
        </div>
        <div>
          <span className="text-xs md:text-sm font-semibold text-primary-text">{t('gender')}</span>
          <span className="text-xs md:text-sm font-medium text-secondary-text">
            {gender === 'Men' && t('men')}
            {gender === 'Women' && t('Women')}
            {gender === undefined && 'N/A'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs md:text-sm font-semibold text-primary-text">{t('status')}</span>
          <div
            className={clsx(
              'text-xs py-0.5 px-1 rounded-md font-medium max-w-max',
              status === 'Active' && 'bg-success/15 text-success',
              status === 'Inactive' && 'bg-danger/15 text-danger'
            )}
          >
            {status === 'Active' && t('active')}
            {status === 'Inactive' && t('inactive')}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs md:text-sm font-semibold text-primary-text">{t('role')}</span>
          <UserRole userRole={role} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
