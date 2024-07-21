'use client';

import PrintContainer from '@/components/search/PrintContainer';
import ProductFilter from '../filter/ProductFilter';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import ItemsPerPageSelector from '@/components/search/ItemsPerPageSelector';
import BoxButton from '@/components/form/BoxButton';
import Plus from '@/components/icon/Plus';
import { Suspense, useState } from 'react';
import ProductsDeleteButton from '../list/ProductsDeleteButton';
import LoadProducts from '../list/LoadProducts';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

interface ProductFrameProps {}

const ProductFrame = ({}: ProductFrameProps) => {
  const t = useTranslations('Product.list');

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const handleSelect = (id: string) => {
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
      return;
    }
    setSelectedProductIds((prevIds) => [...prevIds, id]);
  };
  const handleClearIds = () => {
    setSelectedProductIds([]);
  };

  return (
    <div className="divide-y divide-black/10 space-y-10">
      <ProductFilter />
      <PrintContainer
        heading={
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="max-w-96">
                <SearchQueryBarSuspense />
              </div>
              <ProductsDeleteButton onDelete={handleClearIds} selectedProductIds={selectedProductIds} />
            </div>
            <div>
              <ItemsPerPageSelector />
            </div>
          </div>
        }
        ending={
          <div>
            <Link href="/admin/products/create">
              <BoxButton disabled={false} type="button" theme="primary">
                <Plus />
                {t('new')}
              </BoxButton>
            </Link>
          </div>
        }
      >
        <Suspense>
          <LoadProducts onSelect={handleSelect} selectedProductIds={selectedProductIds} />
        </Suspense>
      </PrintContainer>
    </div>
  );
};

export default ProductFrame;
