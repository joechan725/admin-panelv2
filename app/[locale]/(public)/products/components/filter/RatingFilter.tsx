'use client';

import RadioHollow from '@/components/form/RadioHollow';
import StarBar from '@/components/ui/StarBar';
import { useSearching } from '@/lib/hooks/searchParam/useSearching';
import { useTranslations } from 'next-intl';

interface RatingFilterProps {
  href?: string;
  totalStars: number;
}

const RatingFilter = ({ href, totalStars }: RatingFilterProps) => {
  const t = useTranslations('Product.filter');

  const { loadSetSearchParams, loadRemoveSearchParams, searchParams, path, router } = useSearching();

  const rating = +(searchParams.get('rating') ?? 0);

  const handleClick = (newRating: number) => {
    if (href && path !== href) {
      router.push(`${href}?rating=${newRating}&page=1`, { scroll: false });
      return;
    }

    if (rating === newRating) {
      loadRemoveSearchParams({
        key: 'rating',
        scroll: false,
      });
      return;
    }

    loadSetSearchParams({
      key: 'rating',
      value: newRating,
      scroll: false,
    });
  };

  return (
    <div className="space-y-2">
      <div className="font-semibold text-primary-text">{t('rating')}</div>
      <div className="space-y-1">
        {Array.from({ length: totalStars }).map((_, index) => {
          const currentStar = totalStars - index;
          const isSelected = rating === currentStar;
          return (
            <div
              key={currentStar}
              role="button"
              className="group flex gap-2 items-center"
              onClick={() => handleClick(currentStar)}
            >
              <RadioHollow isSelected={isSelected} theme="primary" size="sm" />
              <StarBar activeStar={currentStar} totalStars={totalStars} />
              {currentStar !== totalStars && (
                <div className="text-sm font-medium text-secondary-text">{t('orAbove')}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingFilter;
