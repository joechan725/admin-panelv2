'use client';

import { useSearching } from '@/lib/hooks/searchParam/useSearching';
import { useEffect, useState } from 'react';
import RangeInput from '@/components/form/RangeInput';
import { useTranslations } from 'next-intl';

interface PriceFilterProps {
  href?: string;
  highestPrice: number;
  lowestPrice: number;
}

const PriceFilter = ({ href, highestPrice, lowestPrice }: PriceFilterProps) => {
  const t = useTranslations('Product.filter');
  const { loadSetSearchParams, path, router, searchParams } = useSearching();

  const maxPriceParams = searchParams.get('maxPrice');
  const minPriceParams = searchParams.get('minPrice');

  const initMaxPrice = maxPriceParams !== null ? (!isNaN(+maxPriceParams) ? +maxPriceParams : undefined) : undefined;
  const initMinPrice = minPriceParams !== null ? (!isNaN(+minPriceParams) ? +minPriceParams : undefined) : undefined;

  const [maxPrice, setMaxPrice] = useState<undefined | number>(initMaxPrice);
  const [minPrice, setMinPrice] = useState<undefined | number>(initMinPrice);

  useEffect(() => {
    if (!maxPrice) {
      return;
    }
    const timer = setTimeout(() => {
      if (href && path !== href) {
        router.push(`${href}?maxPrice=${maxPrice}&page=1`);
        return;
      }
      loadSetSearchParams({ key: 'maxPrice', value: maxPrice, scroll: false });
    }, 200);
    return () => clearTimeout(timer);
  }, [maxPrice]);

  useEffect(() => {
    if (!minPrice) {
      return;
    }
    const timer = setTimeout(() => {
      if (href && path !== href) {
        router.push(`${href}?minPrice=${minPrice}`);
        return;
      }
      loadSetSearchParams({ key: 'minPrice', value: minPrice, scroll: false });
    }, 300);
    return () => clearTimeout(timer);
  }, [minPrice]);

  return (
    <div className="space-y-2">
      <div className="font-semibold text-primary-text">{t('price')}</div>
      <RangeInput
        highestValue={highestPrice}
        lowestValue={lowestPrice}
        maxValue={maxPrice}
        minValue={minPrice}
        setMaxValue={setMaxPrice}
        setMinValue={setMinPrice}
      />
    </div>
  );
};

export default PriceFilter;
