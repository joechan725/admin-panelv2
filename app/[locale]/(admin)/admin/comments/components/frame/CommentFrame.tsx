'use client';

import PrintContainer from '@/components/search/PrintContainer';
import ItemsPerPageSelector from '@/components/search/ItemsPerPageSelector';
import { Suspense, useState } from 'react';
import CommentsDeleteButton from '../list/CommentsDeleteButton';
import LoadComments from '../list/LoadComments';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';

interface CommentFrameProps {}

type IdObject = { productId: string; commentId: string };

const CommentFrame = ({}: CommentFrameProps) => {
  const [selectedIds, setSelectedIds] = useState<IdObject[]>([]);
  const handleSelect = (newIdObject: IdObject) => {
    const { commentId, productId } = newIdObject;
    if (selectedIds.includes({ commentId, productId })) {
      setSelectedIds((prevIds) =>
        prevIds.filter((idObject) => idObject.commentId === commentId && idObject.productId === productId)
      );
      return;
    }
    setSelectedIds((prevIds) => [...prevIds, newIdObject]);
  };
  const handleClearIds = () => {
    setSelectedIds([]);
  };

  return (
    <div className="divide-y divide-black/10 space-y-10">
      <PrintContainer
        heading={
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="max-w-96">
                <SearchQueryBarSuspense />
              </div>
              <CommentsDeleteButton onDelete={handleClearIds} selectedIds={selectedIds} />
            </div>
            <div>
              <ItemsPerPageSelector />
            </div>
          </div>
        }
      >
        <Suspense>
          <LoadComments onSelect={handleSelect} selectedIds={selectedIds} />
        </Suspense>
      </PrintContainer>
    </div>
  );
};

export default CommentFrame;
