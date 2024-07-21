import CategoryItem from './CategoryItem';
import { PrivateCategory } from '@/models/classification/category/PrivateCategory';

interface CategoryListProps {
  categories: PrivateCategory[];
  onSelect?: (id: string) => void;
  selectedCategoryIds?: string[];
}

const CategoryList = ({ categories, onSelect, selectedCategoryIds }: CategoryListProps) => {
  return (
    categories &&
    categories.length > 0 &&
    categories.map((category) => (
      <CategoryItem
        key={category.id}
        privateCategory={category}
        onSelect={onSelect}
        isSelect={selectedCategoryIds && selectedCategoryIds.includes(category.id)}
      />
    ))
  );
};

export default CategoryList;
