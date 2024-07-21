'use client';

import XMark from '@/components/icon/XMark';
import { useSearching } from '@/lib/hooks/searchParam/useSearching';

interface AdminPageCancelSearchProps {}
const AdminPageCancelSearch = ({}: AdminPageCancelSearchProps) => {
  const { loadRemoveSearchParams } = useSearching();
  return (
    <button onClick={() => loadRemoveSearchParams({ key: 'page-search' })}>
      <XMark sizeClassName="size-5" className="text-red-700 hover:text-opacity-70 active:text-opacity-40" />
    </button>
  );
};

export default AdminPageCancelSearch;
