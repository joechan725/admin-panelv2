import LoadAdminComments from '@/components/features/comment/LoadAdminComments';
import Widget from '@/components/layout/container/Widget';
import ItemsPerPageSelector from '@/components/search/ItemsPerPageSelector';
import PrintContainer from '@/components/search/PrintContainer';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import { useTranslations } from 'next-intl';

interface CommentRootProps {}

const CommentRoot = ({}: CommentRootProps) => {
  const t = useTranslations('Comment.list');

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-screen-lg w-full">
        <Widget className="min-h-60">
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-primary-text mx-2">{t('title')}</div>
            </div>
            <hr className="h-0.5 w-full bg-slate-600/20" />
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
              <LoadAdminComments />
            </PrintContainer>
          </div>
        </Widget>
      </div>
    </div>
  );
};

export default CommentRoot;
