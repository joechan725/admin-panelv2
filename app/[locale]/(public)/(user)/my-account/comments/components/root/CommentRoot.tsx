import LoadUserComments from '@/components/features/comment/LoadUserComments';
import LightBorder from '@/components/layout/container/LightBorder';
import ItemsPerPageSelector from '@/components/search/ItemsPerPageSelector';
import PrintContainer from '@/components/search/PrintContainer';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import { useTranslations } from 'next-intl';

interface CommentRootProps {}

const CommentRoot = ({}: CommentRootProps) => {
  const t = useTranslations('Comment.list');

  return (
    <LightBorder className="min-h-60 p-6 w-full">
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-primary-text mx-2">{t('title')}</div>
        </div>
        <hr className="h-0.5 w-full bg-slate-600/20" />
      </div>
      <PrintContainer
        heading={
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="max-w-96">
                <SearchQueryBarSuspense />
              </div>
            </div>
            <div>
              <ItemsPerPageSelector />
            </div>
          </div>
        }
      >
        <LoadUserComments />
      </PrintContainer>
    </LightBorder>
  );
};

export default CommentRoot;
