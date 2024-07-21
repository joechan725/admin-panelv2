import UserRole from '@/components/ui/UserRole';
import AvatarShow from '@/components/ui/image/AvatarShow';
import ImageShow from '@/components/ui/image/ImageShow';
import EnlargeImageButton from '@/components/ui/image/EnlargeImageButton';
import { formatDate } from '@/lib/helpers/date/formatDate';
import { combineFNameAndLName } from '@/lib/helpers/string/combineFNameAndLName';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import { Reply } from '@/models/reply/Reply';
import { useLanguage } from '@/lib/hooks/language/useLanguage';

interface ReplyItemProps {
  reply: Reply;
  isLastOne: boolean;
}

const ReplyItem = ({ reply, isLastOne }: ReplyItemProps) => {
  const { convertUserName } = useLanguage();

  const { content, updatedAt, title, userAvatar, userFirstName, userLastName, images, userRole } = reply;

  return (
    <div className="pt-2">
      <div className="flex gap-4 items-center mb-2">
        <AvatarShow image={userAvatar} sizeClassName="size-8 sm:size-10" />
        <div>
          <div className="flex gap-2 items-center">
            <div className="text-sm sm:text-base font-semibold text-primary-text">
              {convertUserName({
                firstName: userFirstName,
                lastName: userLastName,
              })}
            </div>
            {userRole === 'admin' && <UserRole userRole={userRole} />}
          </div>
          <div className="text-xs sm:text-sm font-medium text-secondary-text">{formatDate(updatedAt, 'medium')}</div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="min-w-8 sm:min-w-10">
          {!isLastOne && <div className="mx-auto w-[2px] h-full bg-gray-200" />}
        </div>
        <div>
          <div className="text-sm sm:text-base font-semibold text-primary-text">{title}</div>
          <div className="text-sm sm:text-base font-medium text-secondary-text">{splitNewLine(content)}</div>
          {images && images.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-2">
              {images.map((image) => (
                <EnlargeImageButton key={image.id} image={image}>
                  <ImageShow image={image} sizeClassName="size-14 sm:size-20" />
                </EnlargeImageButton>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;
