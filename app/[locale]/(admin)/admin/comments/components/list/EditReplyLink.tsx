import Edit from '@/components/icon/Edit';
import IconButton from '@/components/ui/button/IconButton';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

interface EditReplyLinkProps {
  commentId: string;
  replyId: string;
}

const EditReplyLink = ({ commentId, replyId }: EditReplyLinkProps) => {
  const t = useTranslations('Comment.adminList');

  return (
    <HoverPopup message={t('edit')}>
      <IconButton type="button" disabled={false} theme="secondary">
        <Link href={`/admin/comments/${commentId}/replies/${replyId}/edit`}>
          <Edit sizeClassName="size-4" />
        </Link>
      </IconButton>
    </HoverPopup>
  );
};

export default EditReplyLink;
