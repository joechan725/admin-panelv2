'use client';

import Edit from '@/components/icon/Edit';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { useSearching } from '@/lib/hooks/searchParam/useSearching';
import { PrivateCategory } from '@/models/classification/category/PrivateCategory';

interface CategoryEditButtonProps {
  privateCategory: PrivateCategory;
}
const CategoryEditButton = ({ privateCategory }: CategoryEditButtonProps) => {
  const { loadSetSearchParams } = useSearching();
  const handleClick = () => {
    loadSetSearchParams({
      key: 'edit-category',
      value: privateCategory.id,
    });
  };
  return (
    <HoverPopup message="Edit">
      <button type="button" onClick={handleClick} className="text-gray-500 hover:text-sky-700 active:text-sky-800">
        <Edit sizeClassName="size-5" />
      </button>
    </HoverPopup>
  );
};
export default CategoryEditButton;
