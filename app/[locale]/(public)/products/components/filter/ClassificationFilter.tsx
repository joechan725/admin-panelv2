'use client';

import BoxTick from '@/components/form/BoxTick';
import { useSearching } from '@/lib/hooks/searchParam/useSearching';
import { BaseMetadata } from '@/models/classification/BaseMetadata';
import { useLocale } from 'next-intl';

interface ClassificationFilterProps {
  href?: string;
  title: string;
  searchParamsKey: string;
  classifications: BaseMetadata[];
}

const ClassificationFilter = ({ href, title, searchParamsKey, classifications }: ClassificationFilterProps) => {
  const locale = useLocale();

  const { loadToggleSearchParams, path, router, searchParams } = useSearching();

  const currentSlug = searchParams.getAll(searchParamsKey);

  const handleToggle = (value: string) => {
    if (href && href !== path) {
      router.push(`${href}?${searchParamsKey}=${value}&page=1`, { scroll: false });
      return;
    }
    loadToggleSearchParams({
      scroll: false,
      key: searchParamsKey,
      value,
    });
  };

  return (
    classifications &&
    classifications.length > 0 && (
      <div className="space-y-2">
        <div className="font-semibold text-primary-text">{title}</div>
        <div className="space-y-2">
          {classifications.map((classification) => {
            const { id, nameEN, nameZH } = classification;
            const name = locale === 'en' ? nameEN : nameZH;
            const isSelected = currentSlug.includes(nameEN) || currentSlug.includes(nameZH);
            return (
              <div key={id} role="button" className="group flex gap-2 items-center" onClick={() => handleToggle(name)}>
                <BoxTick isSelected={isSelected} theme="primary" size="sm" />
                <div className="text-sm font-medium text-secondary-text">{name}</div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default ClassificationFilter;
