import Widget from '@/components/layout/container/Widget';
import { useTranslations } from 'next-intl';
import CommentFrame from '../frame/CommentFrame';

interface CommentRootProps {}

const CommentRoot = ({}: CommentRootProps) => {
  const t = useTranslations('Comment.adminList');

  return (
    <div className="space-y-5">
      <div className="ml-2 text-2xl text-slate-700 font-semibold">{t('title')}</div>
      <div className="space-y-6">
        <Widget className="p-4">
          <CommentFrame />
        </Widget>
      </div>
    </div>
  );
};

export default CommentRoot;
