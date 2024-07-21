'use client';

import BoxButton from '@/components/form/BoxButton';
import Plus from '@/components/icon/Plus';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface AddProductLinkProps {}
const AddProductLink = ({}: AddProductLinkProps) => {
  const params = useParams<{ userId: string }>();
  const { userId } = params;

  return (
    <div className="flex justify-end">
      <Link href={`/admin/users/${userId}/wishlist/add-products`}>
        <BoxButton disabled={false} theme="primary" type="button" fontSize="sm">
          <div className="flex gap-2 items-center">
            <Plus sizeClassName="size-4" />
            Add products
          </div>
        </BoxButton>
      </Link>
    </div>
  );
};
export default AddProductLink;
