import { useTranslations } from 'next-intl';
import { getProductNavLinks } from './getProductNavLinks';
import ProductTabList from './ProductTabList';

interface ProductTabSetProps {
  productId: string;
}

const ProductTabSet = ({ productId }: ProductTabSetProps) => {
  const t = useTranslations('Product.detail');

  return (
    <div className="w-full flex items-center justify-around border-gray-300/80 border-b">
      <ProductTabList navLinks={getProductNavLinks({ productId, t })} />
    </div>
  );
};

export default ProductTabSet;
