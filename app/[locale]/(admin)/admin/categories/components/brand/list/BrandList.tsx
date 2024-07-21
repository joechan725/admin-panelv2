import BrandItem from './BrandItem';
import { PrivateBrand } from '@/models/classification/brand/PrivateBrand';

interface BrandListProps {
  brands: PrivateBrand[];
  onSelect?: (id: string) => void;
  selectedBrandIds?: string[];
}

const BrandList = ({ brands, selectedBrandIds, onSelect }: BrandListProps) => {
  return (
    brands &&
    brands.length > 0 &&
    brands.map((brand) => (
      <BrandItem
        key={brand.id}
        privateBrand={brand}
        onSelect={onSelect}
        isSelect={selectedBrandIds && selectedBrandIds.includes(brand.id)}
      />
    ))
  );
};

export default BrandList;
