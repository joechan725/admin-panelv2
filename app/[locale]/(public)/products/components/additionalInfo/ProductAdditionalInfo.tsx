import { Product } from '@/models/product/Product';
import { splitNewLine } from '@/lib/helpers/string/splitNewLine';
import ImageShow from '@/components/ui/image/ImageShow';
import { useLocale } from 'next-intl';

interface ProductAdditionalInfoProps {
  product: Product;
}

const ProductAdditionalInfo = ({ product }: ProductAdditionalInfoProps) => {
  const locale = useLocale();
  const { detailEN, detailZH, detailImages } = product;

  const detail = locale === 'en' ? detailEN : detailZH;

  return (
    <div className="space-y-4">
      <div className="text-sm md:text-base font-medium text-secondary-text">{splitNewLine(detail)}</div>
      {detailImages && detailImages.length > 0 && (
        <div className="space-y-2">
          {detailImages.map((detailImage) => (
            <ImageShow key={detailImage.id} image={detailImage} sizeClassName="w-full" />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductAdditionalInfo;
