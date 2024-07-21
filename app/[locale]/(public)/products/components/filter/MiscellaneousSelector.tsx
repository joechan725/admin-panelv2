'use client';

import BoxTick from '@/components/form/BoxTick';
import { useSearching } from '@/lib/hooks/searchParam/useSearching';
import { TranslationFunction } from '@/types/TranslationFunction';
import { useTranslations } from 'next-intl';

interface MiscellaneousSelectorProps {
  href?: string;
}

const getSelectors = (tFilter: TranslationFunction) => [
  {
    title: tFilter('onSale'),
    key: 'onSale',
  },
  {
    title: tFilter('inStock'),
    key: 'inStock',
  },
];

const MiscellaneousSelector = ({ href }: MiscellaneousSelectorProps) => {
  const t = useTranslations('Product.filter');

  const { loadToggleSearchParams, searchParams, path, router } = useSearching();

  const handleClick = (key: string) => {
    if (href && path !== href) {
      router.push(`${href}?${key}=true&page=1`, { scroll: false });
      return;
    }

    loadToggleSearchParams({
      key,
      value: 'true',
      scroll: false,
    });
  };

  return (
    <div className="space-y-2">
      <div className="font-semibold text-primary-text">{t('miscellaneous')}</div>
      <div className="space-y-2">
        {getSelectors(t).map((selector) => {
          const { title, key } = selector;
          const currentValue = searchParams.get(key);
          const isSelected = currentValue !== null;
          return (
            <div key={key} role="button" className="group flex gap-2 items-center" onClick={() => handleClick(key)}>
              <BoxTick isSelected={isSelected} theme="primary" size="sm" />
              <div className="text-sm font-medium text-secondary-text">{title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MiscellaneousSelector;
