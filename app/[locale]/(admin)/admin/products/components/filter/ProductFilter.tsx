'use client';

import SelectSearchSuspense from '@/components/search/SelectSearchSuspense';
import { useClassificationListListener } from '@/lib/hooks/classification/useClassificationListListener';
import { useLocale, useTranslations } from 'next-intl';

interface ProductFilterProps {}

const ProductFilter = ({}: ProductFilterProps) => {
  const t = useTranslations('Product.list');
  const locale = useLocale();

  const { classificationList } = useClassificationListListener();

  const { brands, categories, collections } = classificationList;

  const brandSelectOptions = brands.map(({ nameZH, nameEN }) => ({
    option: locale === 'en' ? nameEN : nameZH,
    searchParamsValue: locale === 'en' ? nameEN : nameZH,
  }));
  const categorySelectOptions = categories.map(({ nameZH, nameEN }) => ({
    option: locale === 'en' ? nameEN : nameZH,
    searchParamsValue: locale === 'en' ? nameEN : nameZH,
  }));
  const collectionSelectOptions = collections.map(({ nameZH, nameEN }) => ({
    option: locale === 'en' ? nameEN : nameZH,
    searchParamsValue: locale === 'en' ? nameEN : nameZH,
  }));

  return (
    <div className="space-y-5">
      <div className="text-slate-700 font-semibold text-lg">{t('filter')}</div>
      <div className="flex items-center justify-between gap-4">
        <SelectSearchSuspense
          searchParamsKey="collection"
          selectOptions={collectionSelectOptions}
          title={t('collection')}
        />
        <SelectSearchSuspense searchParamsKey="category" selectOptions={categorySelectOptions} title={t('category')} />
        <SelectSearchSuspense searchParamsKey="brand" selectOptions={brandSelectOptions} title={t('brand')} />
      </div>
    </div>
  );
};

export default ProductFilter;
