import { useEffect } from 'react';
import { useSearching } from '../searchParam/useSearching';

export const usePage = (totalPageCount: number, searchParamsKey = 'page') => {
  const { searchParams, loadSetSearchParams } = useSearching();

  const searchParamsPage = searchParams.get(searchParamsKey);

  const currentPage = +(searchParamsPage ?? 1);

  const goToFirstPage = () => {
    loadSetSearchParams({
      key: searchParamsKey,
      value: 1,
    });
  };

  const goToLastPage = () => {
    loadSetSearchParams({
      key: searchParamsKey,
      value: totalPageCount,
    });
  };

  const setPageNumber = (page: number) => {
    loadSetSearchParams({
      key: searchParamsKey,
      value: page,
    });
  };

  const incrementPage = () => {
    const newPage = currentPage + 1;
    if (newPage > totalPageCount) {
      goToLastPage();
      return;
    }
    loadSetSearchParams({
      key: searchParamsKey,
      value: newPage,
    });
  };

  const decrementPage = () => {
    const newPage = currentPage - 1;
    if (newPage < 1) {
      goToFirstPage();
      return;
    }
    loadSetSearchParams({
      key: searchParamsKey,
      value: newPage,
    });
  };

  useEffect(() => {
    if (searchParamsPage === null || +currentPage < 1) {
      goToFirstPage();
    } else if (+currentPage > totalPageCount) {
      goToLastPage();
    }
  }, [searchParamsPage, currentPage]);

  return { currentPage, goToFirstPage, goToLastPage, incrementPage, decrementPage, setPageNumber };
};
