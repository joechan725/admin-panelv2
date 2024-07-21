import { Comment } from '@/models/comment/Comment';
import AvatarShow from '@/components/ui/image/AvatarShow';
import UserRole from '@/components/ui/UserRole';
import { Link } from '@/navigation';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import ImageShow from '@/components/ui/image/ImageShow';
import Edit from '@/components/icon/Edit';
import CommentDeleteButton from './CommentDeleteButton';
import CommentIcon from '@/components/icon/Comment';
import TrBody from '@/components/table/TrBody';
import Td from '@/components/table/Td';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import IconButton from '@/components/ui/button/IconButton';
import CommentCard from './CommentCard';
import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/lib/helpers/date/formatDate';
import { useLanguage } from '@/lib/hooks/language/useLanguage';

interface CommentItemProps {
  comment: Comment;
  onSelect?: (commentId: string) => void;
  isSelect?: boolean;
}

const CommentItem = ({ comment, onSelect, isSelect }: CommentItemProps) => {
  const t = useTranslations('Comment.adminList');
  const locale = useLocale();
  const { convertUserName } = useLanguage();

  const {
    id,
    userId,
    userFirstName,
    userLastName,
    userAvatar,
    userEmail,
    userRole,
    productId,
    productNameZH,
    productNameEN,
    productDescriptionZH,
    productDescriptionEN,
    productImage,
    createdAt,
    updatedAt,
    boughtQuantity,
  } = comment;

  const userName = convertUserName({
    firstName: userFirstName,
    lastName: userLastName,
  });

  const productName = locale === 'en' ? productNameEN : productNameZH;
  const productDescription = locale === 'en' ? productDescriptionEN : productDescriptionZH;

  return (
    <TrBody>
      {onSelect && (
        <Td>
          <input
            type="checkbox"
            checked={isSelect}
            onClick={() => onSelect(id)}
            className="size-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 focus:ring"
          />
        </Td>
      )}

      {/* product */}
      <Td>
        <Link href={`/admin/products/${productId}`} className="group hover:opacity-85 active:opacity-70">
          <div className="flex items-center gap-4">
            <ImageShow sizeClassName="size-10" image={productImage} />
            <div className="flex flex-col">
              <div className="truncate text-sm font-semibold text-primary-text group-hover:underline underline-offset-1">
                {productName}
              </div>
              {productDescription !== undefined && (
                <div className="text-xs text-ellipsis line-clamp-3 max-w-40 font-medium text-secondary-text group-hover:underline underline-offset-1">
                  {splitNewLine(productDescription)}
                </div>
              )}
            </div>
          </div>
        </Link>
      </Td>

      {/* user */}
      <Td>
        <Link href={`/admin/users/${userId}`} className="group hover:opacity-85 active:opacity-70">
          <div className="flex items-center gap-4">
            <AvatarShow sizeClassName="size-10" image={userAvatar} />
            <div className="flex flex-col">
              <div className="truncate text-sm font-semibold text-primary-text group-hover:underline underline-offset-1">
                {userName}
              </div>
              <div className="text-xs truncate font-medium text-secondary-text group-hover:underline underline-offset-1">
                {userEmail ?? 'N/A'}
              </div>
              <UserRole userRole={userRole} />
            </div>
          </div>
        </Link>
      </Td>

      {/* boughtQuantity */}
      <Td>
        <div className="text-sm font-medium text-secondary-text">{boughtQuantity}</div>
      </Td>

      {/* comment */}
      <Td>
        <CommentCard comment={comment} />
      </Td>

      {/* time */}
      <Td>
        <div className="space-y-0.5">
          <div className="text-xs font-medium text-secondary-text">{t('updatedAt')}</div>
          <div className="text-xs font-semibold text-primary-text">
            {updatedAt ? formatDate(updatedAt, 'short') : 'N/A'}
          </div>
          <div className="text-xs font-medium text-secondary-text">{t('createdAt')}</div>
          <div className="text-xs font-semibold text-primary-text">
            {createdAt ? formatDate(createdAt, 'short') : 'N/A'}
          </div>
        </div>
      </Td>

      {/* actions */}
      <Td>
        <div className="flex items-center gap-2">
          <HoverPopup message={t('reply')}>
            <IconButton type="button" disabled={false} theme="secondary">
              <Link href={`/admin/comments/${id}/replies/create`}>
                <CommentIcon sizeClassName="size-5" />
              </Link>
            </IconButton>
          </HoverPopup>
          <HoverPopup message={t('edit')}>
            <IconButton type="button" disabled={false} theme="secondary">
              <Link href={`/admin/comments/${id}/edit`}>
                <Edit sizeClassName="size-5" />
              </Link>
            </IconButton>
          </HoverPopup>
          <CommentDeleteButton comment={comment} />
        </div>
      </Td>
    </TrBody>
  );
};

export default CommentItem;
