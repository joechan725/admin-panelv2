'use client';

import CollectionTable from '../collection/list/CollectionTable';
import CategoryTable from '../category/list/CategoryTable';
import BrandTable from '../brand/list/BrandTable';
import BoxButton from '@/components/form/BoxButton';
import Plus from '@/components/icon/Plus';
import { Link } from '@/navigation';
import { useState } from 'react';
import CollectionsDeleteButton from '../collection/list/CollectionsDeleteButton';
import CategoriesDeleteButton from '../category/list/CategoriesDeleteButton';
import BrandsDeleteButton from '../brand/list/BrandsDeleteButton';
import { PrivateCollection } from '@/models/classification/collection/PrivateCollection';
import { PrivateBrand } from '@/models/classification/brand/PrivateBrand';
import { PrivateCategory } from '@/models/classification/category/PrivateCategory';
import { useTranslations } from 'next-intl';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface CategoryFrameProps {
  error?: string;
  isLoading: boolean;
  privateCollections: PrivateCollection[];
  privateBrands: PrivateBrand[];
  privateCategories: PrivateCategory[];
}

const CategoryFrame = ({
  error,
  isLoading,
  privateBrands,
  privateCategories,
  privateCollections,
}: CategoryFrameProps) => {
  const t = useTranslations('Category.list');

  const [selectedBrandIds, setSelectBrandIds] = useState<string[]>([]);
  const [selectedCollectionIds, setSelectCollectionIds] = useState<string[]>([]);
  const [selectedCategoryIds, setSelectCategoryIds] = useState<string[]>([]);

  const handleBrandSelect = (id: string) => {
    if (selectedBrandIds.includes(id)) {
      setSelectBrandIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
      return;
    }
    setSelectBrandIds((prevIds) => [...prevIds, id]);
  };

  const handleCollectionSelect = (id: string) => {
    if (selectedCollectionIds.includes(id)) {
      setSelectCollectionIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
      return;
    }
    setSelectCollectionIds((prevIds) => [...prevIds, id]);
  };

  const handleCategorySelect = (id: string) => {
    if (selectedCategoryIds.includes(id)) {
      setSelectCategoryIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
      return;
    }
    setSelectCategoryIds((prevIds) => [...prevIds, id]);
  };

  const handleBrandClearIds = () => {
    setSelectBrandIds([]);
  };

  const handleCollectionClearIds = () => {
    setSelectCollectionIds([]);
  };

  const handleCategoryClearIds = () => {
    setSelectCategoryIds([]);
  };

  return (
    <div className="space-y-8">
      {error && <ErrorTranslation error={error} />}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="text-xl font-semibold text-primary-text">{t('collections')}</div>
            <CollectionsDeleteButton
              selectedCollectionIds={selectedCollectionIds}
              onDelete={handleCollectionClearIds}
            />
          </div>
          <Link href="/admin/categories/collections/create">
            <BoxButton disabled={false} type="button" theme="primary">
              <Plus />
              {t('newCollection')}
            </BoxButton>
          </Link>
        </div>
        <CollectionTable
          privateCollections={privateCollections}
          isLoading={isLoading}
          selectedCollectionIds={selectedCollectionIds}
          onSelect={handleCollectionSelect}
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="text-xl font-semibold text-primary-text">{t('categories')}</div>
            <CategoriesDeleteButton selectedCategoryIds={selectedCategoryIds} onDelete={handleCategoryClearIds} />
          </div>
          <Link href="/admin/categories/categories/create">
            <BoxButton disabled={false} type="button" theme="primary">
              <Plus />
              {t('newCategory')}
            </BoxButton>
          </Link>
        </div>
        <CategoryTable
          privateCategories={privateCategories}
          isLoading={isLoading}
          selectedCategoryIds={selectedCategoryIds}
          onSelect={handleCategorySelect}
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="text-xl font-semibold text-primary-text">{t('brands')}</div>
            <BrandsDeleteButton selectedBrandIds={selectedBrandIds} onDelete={handleBrandClearIds} />
          </div>
          <Link href="/admin/categories/brands/create">
            <BoxButton disabled={false} type="button" theme="primary">
              <Plus />
              {t('newBrand')}
            </BoxButton>
          </Link>
        </div>
        <BrandTable
          privateBrands={privateBrands}
          isLoading={isLoading}
          selectedBrandIds={selectedBrandIds}
          onSelect={handleBrandSelect}
        />
      </div>
    </div>
  );
};

export default CategoryFrame;
