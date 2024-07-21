import AvatarShow from '@/components/ui/image/AvatarShow';
import ImageShow from '@/components/ui/image/ImageShow';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import UserRole from '@/components/ui/UserRole';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import { useLanguage } from '@/lib/hooks/language/useLanguage';
import { Reply } from '@/models/reply/Reply';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface ReplyItemProps {
  reply: Reply;
}

const ReplyItem = ({ reply }: ReplyItemProps) => {
  const t = useTranslations('Comment.adminList');
  const { convertUserName } = useLanguage();

  const { userId, userRole, userAvatar, userEmail, userFirstName, userLastName, images, title, content } = reply;

  const userName = convertUserName({
    firstName: userFirstName,
    lastName: userLastName,
  });

  return (
    <div className="ml-4">
      <Link href={`/admin/users/${userId}`} className="group hover:opacity-85 active:opacity-70">
        <div className="flex items-center gap-4">
          <AvatarShow sizeClassName="size-8" image={userAvatar} />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="truncate text-sm font-semibold text-primary-text group-hover:underline underline-offset-1">
                {userName}
              </div>
              <UserRole userRole={userRole} />
            </div>
            <div className="text-xs truncate font-medium text-secondary-text group-hover:underline underline-offset-1">
              {userEmail ?? 'N/A'}
            </div>
          </div>
        </div>
      </Link>
      <div>
        <div className="text-sm font-semibold text-primary-text text-ellipsis line-clamp-2">{title}</div>
        <div className="text-xs font-medium text-secondary-text text-ellipsis line-clamp-3">
          {splitNewLine(content)}
        </div>
        <div className="flex gap-1 flex-wrap">
          {images.map((image) => (
            <HoverPopup background={false} message={<ImageShow key={image.id} image={image} sizeClassName="size-32" />}>
              <ImageShow key={image.id} image={image} sizeClassName="size-8" />
            </HoverPopup>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;
