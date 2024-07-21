import { searchObjectsAllKeys } from '@/lib/helpers/objects/searchObjectsAllKeys';
import { sliceObjectsByPage } from '@/lib/helpers/objects/sliceObjectsByPage';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { Comment } from '@/models/comment/Comment';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface searchAndOrderCommentsParameters {
  searchParams: ReadonlyURLSearchParams;
  comments: Comment[];
  locale: string;
}

export const searchAndOrderComments = ({ searchParams, comments, locale }: searchAndOrderCommentsParameters) => {
  const searchQuery = searchParams.get('search');
  const orderBy = searchParams.get('orderby');
  const itemsPerPage = +(searchParams.get('limit') ?? 10);
  const currentPage = +(searchParams.get('page') ?? 1);

  let displayComments = comments;

  // search by query
  if (displayComments && searchQuery) {
    displayComments = searchObjectsAllKeys(displayComments, searchQuery);
  }

  // sort by id
  if (displayComments && orderBy === 'id-asc') {
    displayComments = sortObjectsByKey(displayComments, 'id', 'asc');
  }
  if (displayComments && orderBy === 'id-desc') {
    displayComments = sortObjectsByKey(displayComments, 'id', 'desc');
  }

  // sort by product name
  if (displayComments && orderBy === 'product-asc') {
    displayComments = sortObjectsByKey(
      displayComments,
      locale === 'en' ? 'productDescriptionEN' : 'productNameZH',
      'asc'
    );
  }
  if (displayComments && orderBy === 'product-desc') {
    displayComments = sortObjectsByKey(
      displayComments,
      locale === 'en' ? 'productDescriptionEN' : 'productNameZH',
      'desc'
    );
  }

  // sort by user name
  if (displayComments && orderBy === 'user-asc') {
    displayComments = sortObjectsByKey(displayComments, 'userFirstName', 'asc');
  }
  if (displayComments && orderBy === 'user-desc') {
    displayComments = sortObjectsByKey(displayComments, 'userFirstName', 'desc');
  }

  // quantity;
  // sort by boughtQuantity
  if (displayComments && orderBy === 'quantity-asc') {
    displayComments = sortObjectsByKey(displayComments, 'boughtQuantity', 'asc');
  }
  if (displayComments && orderBy === 'quantity-desc') {
    displayComments = sortObjectsByKey(displayComments, 'boughtQuantity', 'desc');
  }

  // sort by comment
  if (displayComments && orderBy === 'comment-asc') {
    displayComments = sortObjectsByKey(displayComments, 'content', 'asc');
  }
  if (displayComments && orderBy === 'comment-desc') {
    displayComments = sortObjectsByKey(displayComments, 'content', 'desc');
  }

  // sort by updateAt
  if (displayComments && orderBy === 'updatedAt-asc') {
    displayComments = sortObjectsByKey(displayComments, 'updatedAt', 'asc');
  }
  if (displayComments && orderBy === 'updatedAt-desc') {
    displayComments = sortObjectsByKey(displayComments, 'updatedAt', 'desc');
  }

  // pagination
  if (displayComments) {
    displayComments = sliceObjectsByPage(displayComments, currentPage, itemsPerPage);
  }

  return displayComments;
};
