'use client';

import { useSearching } from '@/lib/hooks/searchParam/useSearching';
import { Tag } from '@/models/tag/Tag';
import clsx from 'clsx/lite';

interface TagFilterProps {
  tags: Tag[];
  href?: string;
  title: string;
}

const TagFilter = ({ tags, href, title }: TagFilterProps) => {
  const { searchParams, router, path, loadToggleSearchParams } = useSearching();

  const selectedTags = searchParams.getAll('tag');

  const handleToggle = (tag: string) => {
    if (href && path !== href) {
      router.push(`${href}?tag=${tag}&page=1`, { scroll: false });
      return;
    }
    loadToggleSearchParams({
      key: 'tag',
      value: tag,
      scroll: false,
    });
  };

  return (
    tags &&
    tags.length > 0 && (
      <div className="space-y-2">
        <div className="font-semibold text-primary-text">{title}</div>
        <div className="flex flex-wrap gap-1 overflow-hidden">
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag.tag);
            return (
              <div
                role="button"
                key={tag.tag}
                className={clsx(
                  'px-2 py-0.5 border rounded text-xs',
                  isSelected
                    ? 'border bg-primary-bg text-white'
                    : 'transition-all border-primary-bg/60 text-primary-text hover:text-white hover:bg-primary-bg/85'
                )}
                onClick={() => handleToggle(tag.tag)}
              >
                {tag.tag}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default TagFilter;
