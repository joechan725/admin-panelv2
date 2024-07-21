'use client';

import Edit from '@/components/icon/Edit';
import IconButton from '@/components/ui/button/IconButton';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { Link } from '@/navigation';
import { useParams } from 'next/navigation';

interface UserCommentEditLinkProps {
  commentId: string;
  mode: 'admin' | 'user';
}

const UserCommentEditLink = ({ commentId, mode }: UserCommentEditLinkProps) => {
  const params = useParams<{ userId?: string }>();
  const { userId } = params;
  const href =
    mode === 'admin' ? `/admin/users/${userId}/comments/${commentId}` : `/my-account/comments/${commentId}/edit`;

  return (
    <HoverPopup message="Edit">
      <IconButton disabled={false} theme="secondary" type="button">
        <Link href={href}>
          <Edit sizeClassName="size-5" />
        </Link>
      </IconButton>
    </HoverPopup>
  );
};

export default UserCommentEditLink;
