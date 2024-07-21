import ImageShow from '@/components/ui/image/ImageShow';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import StarBar from '@/components/ui/StarBar';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import { Comment } from '@/models/comment/Comment';
import { useState } from 'react';
import ReplyList from './ReplyList';
import { useTranslations } from 'next-intl';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  const t = useTranslations('Comment.adminList');

  const [isShowReplies, setIsShowReplies] = useState(false);

  const { title, content, images, rating, replies } = comment;

  return (
    <div className="max-w-96 space-y-1">
      <StarBar activeStar={rating} />
      <div className="text-sm font-semibold text-primary-text text-ellipsis line-clamp-2">{title}</div>
      <div className="text-xs font-medium text-secondary-text text-ellipsis line-clamp-3">{splitNewLine(content)}</div>
      <div className="flex gap-1 flex-wrap">
        {images.map((image) => (
          <HoverPopup background={false} message={<ImageShow key={image.id} image={image} sizeClassName="size-32" />}>
            <ImageShow key={image.id} image={image} sizeClassName="size-8" />
          </HoverPopup>
        ))}
      </div>
      {replies && replies?.length > 0 && (
        <div
          role="button"
          className="text-xs font-medium text-white bg-primary-bg inline-block px-2 py-1 rounded"
          onClick={() => setIsShowReplies((prev) => !prev)}
        >
          {isShowReplies ? t('hiddenReplies') : t('showReplies')}
        </div>
      )}
      {isShowReplies && (
        <div className="mt-2 space-y-2">
          <ReplyList replies={replies} />
        </div>
      )}
    </div>
  );
};

export default CommentCard;
