'use client';

import RadioHollow from '@/components/form/RadioHollow';
import ChevronDoubleUp from '@/components/icon/ChevronDoubleUp';
import { useSearching } from '@/lib/hooks/searchParam/useSearching';
import { TranslationFunction } from '@/types/TranslationFunction';
import { useTranslations } from 'next-intl';

interface OrderbySelectorProps {
  href?: string;
}

const getSelectors = (tFilter: TranslationFunction) => [
  { title: tFilter('price') },
  {
    title: tFilter('ascending'),
    value: 'price-asc',
    icon: <ChevronDoubleUp sizeClassName="size-4" />,
  },
  {
    title: tFilter('descending'),
    value: 'price-desc',
    icon: <ChevronDoubleUp sizeClassName="size-4" className="rotate-180" />,
  },
  { title: tFilter('rating') },
  {
    title: tFilter('ascending'),
    value: 'rating-asc',
    icon: <ChevronDoubleUp sizeClassName="size-4" />,
  },
  {
    title: tFilter('descending'),
    value: 'rating-desc',
    icon: <ChevronDoubleUp sizeClassName="size-4" className="rotate-180" />,
  },
  { title: tFilter('customerReview') },
  {
    title: tFilter('ascending'),
    value: 'comment-asc',
    icon: <ChevronDoubleUp sizeClassName="size-4" />,
  },
  {
    title: tFilter('descending'),
    value: 'comment-desc',
    icon: <ChevronDoubleUp sizeClassName="size-4" className="rotate-180" />,
  },
];

const OrderbySelector = ({ href }: OrderbySelectorProps) => {
  const t = useTranslations('Product.filter');

  const { loadSetSearchParams, loadRemoveSearchParams, searchParams, path, router } = useSearching();

  const currentOrderby = searchParams.get('orderby');

  const handleClick = (value: string) => {
    if (href && path !== href) {
      router.push(`${href}?orderby=${value}&page=1`, { scroll: false });
      return;
    }

    if (currentOrderby === value) {
      loadRemoveSearchParams({
        key: 'orderby',
        scroll: false,
      });
      return;
    }

    loadSetSearchParams({
      key: 'orderby',
      value: value,
      scroll: false,
    });
  };

  return (
    <div className="space-y-2">
      <div className="font-semibold text-primary-text">{t('orderBy')}</div>
      <div className="space-y-2">
        {getSelectors(t).map((selector, index) => {
          const { title, value, icon } = selector;
          if (!value) {
            return (
              <div key={index} className="text-xs font-medium text-tertiary-text">
                {title}
              </div>
            );
          }
          const isSelected = currentOrderby === value;
          return (
            <div key={value} role="button" className="group flex gap-2 items-center" onClick={() => handleClick(value)}>
              <RadioHollow isSelected={isSelected} theme="primary" size="sm" />
              <div className="flex gap-2 items-center">
                <div className="text-sm font-medium text-secondary-text">{title}</div>
                {icon !== undefined && <div className="text-secondary-text">{icon}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderbySelector;
