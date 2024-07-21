import XMark from '@/components/icon/XMark';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { useAdminWishlistItem } from '@/lib/hooks/user/admin/wishlist/useAdminWishlistItem';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface AdminWishlistItemDeleteButtonProps {
  wishlistItemId: string;
}

const AdminWishlistItemDeleteButton = ({ wishlistItemId }: AdminWishlistItemDeleteButtonProps) => {
  const t = useTranslations('Wishlist');

  const { removeItemFromWishlist, isWriting } = useAdminWishlistItem();

  const params = useParams<{ userId: string }>();

  const { userId } = params;

  return (
    <HoverPopup message={t('remove')} algin="right" position="bottom">
      <button onClick={() => removeItemFromWishlist({ wishlistItemId, userId })} disabled={isWriting} className="group">
        <XMark
          sizeClassName="size-4"
          className="text-red-600 transition-all group-hover:text-opacity-85 group-active:text-opacity-70 group-disabled:text-opacity-70 group-disabled:cursor-wait"
        />
      </button>
    </HoverPopup>
  );
};

export default AdminWishlistItemDeleteButton;
