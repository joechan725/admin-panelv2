import { getClassificationList } from '@/firebase/api/classification/getClassificationList';
import { Suspense } from 'react';
import ClassificationFilter from './ClassificationFilter';
import TagFilter from './TagFilter';
import { useTranslations } from 'next-intl';

interface LoadClassificationFilterProps {
  href?: string;
}

const LoadClassificationFilter = async ({ href }: LoadClassificationFilterProps) => {
  try {
    const t = useTranslations('Product.filter');

    const { brands, categories, collections, tags } = await getClassificationList();

    return (
      <Suspense>
        <ClassificationFilter classifications={brands} searchParamsKey="brand" title={t('brands')} href={href} />
        <ClassificationFilter
          classifications={categories}
          searchParamsKey="category"
          title={t('categories')}
          href={href}
        />
        <ClassificationFilter
          classifications={collections}
          searchParamsKey="collection"
          title={t('collections')}
          href={href}
        />
        <TagFilter tags={tags} href={href} title={t('tags')} />
      </Suspense>
    );
  } catch (error) {
    return null;
  }
};

export default LoadClassificationFilter;
