import AvatarShow from '@/components/ui/image/AvatarShow';
import ImageShow from '@/components/ui/image/ImageShow';
import StarBar from '@/components/ui/StarBar';
import { formatDate } from '@/lib/helpers/date/formatDate';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import { Comment } from '@/models/comment/Comment';
import ReplyList from './ReplyList';
import EnlargeImageButton from '@/components/ui/image/EnlargeImageButton';
import UserRole from '@/components/ui/UserRole';
import { useLanguage } from '@/lib/hooks/language/useLanguage';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const { convertUserName } = useLanguage();

  const { userAvatar, userFirstName, userLastName, updatedAt, title, content, rating, images, replies, userRole } =
    comment;

  return (
    <div className="mb-4 p-4 border border-gray-200 rounded">
      <div className="flex gap-4 items-center mb-2">
        <AvatarShow image={userAvatar} sizeClassName="size-8 sm:size-10" />
        <div>
          <div className="flex xs:gap-4 md:gap-8 items-center flex-wrap">
            <div className="text-sm sm:text-base font-semibold text-primary-text">
              {convertUserName({
                firstName: userFirstName,
                lastName: userLastName,
              })}
            </div>
            {userRole === 'admin' && <UserRole userRole={userRole} />}
            <StarBar activeStar={rating} sizeClassName="size-5 sm:size-6" />
          </div>
          <div className="text-xs sm:text-sm font-medium text-secondary-text">{formatDate(updatedAt, 'short')}</div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="min-w-8 sm:min-w-10">
          {replies && replies.length > 0 && <div className="mx-auto w-[2px] h-full bg-gray-200" />}
        </div>
        <div>
          <div className="text-sm sm:text-base font-semibold text-primary-text">{title}</div>
          <div className="text-sm sm:text-base font-medium text-secondary-text">{splitNewLine(content)}</div>
          {images && images.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-2">
              {images.map((image) => (
                <EnlargeImageButton key={image.id} image={image}>
                  <ImageShow image={image} sizeClassName="size-14 sm:size-20" roundedClassName="rounded" />
                </EnlargeImageButton>
              ))}
            </div>
          )}
        </div>
      </div>
      <ReplyList replies={replies} />
    </div>
  );
};

export default CommentItem;
