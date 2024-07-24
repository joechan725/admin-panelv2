import { Comment } from '@/models/comment/Comment';
import Link from 'next/link';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { formatDate } from '@/lib/helpers/date/formatDate';
import ImageShow from '@/components/ui/image/ImageShow';
import StarBar from '@/components/ui/StarBar';
import UserCommentDeleteButton from './UserCommentDeleteButton';
import TrBody from '@/components/table/TrBody';
import Td from '@/components/table/Td';
import UserCommentEditLink from './UserCommentEditLink';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import { useLocale, useTranslations } from 'next-intl';

interface UserCommentItemProps {
  comment: Comment;
  mode: 'admin' | 'user';
}

const UserCommentItem = ({ comment, mode }: UserCommentItemProps) => {
  const t = useTranslations('Comment.list');
  const locale = useLocale();

  const {
    id,
    productId,
    productNameZH,
    productNameEN,
    productDescriptionZH,
    productDescriptionEN,
    productImage,
    title,
    content,
    images,
    rating,
    createdAt,
    updatedAt,
  } = comment;

  const productName = locale === 'en' ? productNameEN : productNameZH;
  const productDescription = locale === 'en' ? productDescriptionEN : productDescriptionZH;

  return (
    <TrBody>
      {/* product */}
      <Td>
        <div className="max-w-48 md:max-w-96">
          <Link href={`/products/${productId}`} className="group hover:opacity-85 active:opacity-70">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex-0">
                <ImageShow sizeClassName="size-10" image={productImage} />
              </div>
              <div className="flex flex-col">
                <div className="text-ellipsis line-clamp-1 text-sm font-semibold text-primary-text group-hover:underline underline-offset-1">
                  {productName}
                </div>
                {productDescription !== undefined && (
                  <div className="text-ellipsis line-clamp-3 text-xs font-medium text-secondary-text group-hover:underline underline-offset-1">
                    {productDescription}
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
      </Td>

      {/* comment */}
      <Td>
        <div className="space-y-1 max-w-96">
          <StarBar activeStar={rating} />
          <div className="text-sm font-semibold text-primary-text text-ellipsis line-clamp-1">{title}</div>
          <div className="text-xs font-medium text-secondary-text text-ellipsis line-clamp-2">
            {splitNewLine(content)}
          </div>
          <div className="flex gap-1 flex-wrap">
            {images.map((image) => (
              <HoverPopup
                background={false}
                message={<ImageShow key={image.id} image={image} sizeClassName="size-32" />}
              >
                <ImageShow key={image.id} image={image} sizeClassName="size-8" />
              </HoverPopup>
            ))}
          </div>
        </div>
      </Td>

      {/* time */}
      <Td hidden="md">
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
          <UserCommentEditLink commentId={id} mode={mode} />
          <UserCommentDeleteButton comment={comment} />
        </div>
      </Td>
    </TrBody>
  );
};

export default UserCommentItem;
