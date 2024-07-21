interface GetPaginationParameters {
  currentPage: number;
  itemsLength: number;
  itemsPerPage: number;
}

export const getPagination = ({ currentPage, itemsLength, itemsPerPage }: GetPaginationParameters) => {
  const totalPageCount = Math.max(Math.ceil(itemsLength / itemsPerPage), 1);

  // Evaluate the pageNumbers Array
  const longPageNumbers: (number | '...')[] = [];
  const shortPageNumbers: (number | '...')[] = [];

  // Calculate the range of page numbers to display
  const longStartPage = Math.max(1, Math.min(currentPage - 2, totalPageCount - 6));
  const longEndPage = Math.min(Math.max(currentPage + 2, 7), totalPageCount);

  const shortStartPage = Math.max(1, Math.min(currentPage - 1, totalPageCount - 4));
  const shortEndPage = Math.min(Math.max(currentPage + 1, 5), totalPageCount);

  // Generate the page numbers
  for (let i = longStartPage; i <= longEndPage; i++) {
    if (i === 1 || i === totalPageCount) {
      continue;
    }
    longPageNumbers.push(i);
  }

  // Add ellipsis if there are more pages
  if (longStartPage >= 3) {
    longPageNumbers.unshift('...');
  }
  if (longEndPage <= totalPageCount - 2) {
    longPageNumbers.push('...');
  }

  // Add the first and last page numbers
  longPageNumbers.unshift(1);
  if (totalPageCount > 1) {
    longPageNumbers.push(totalPageCount);
  }

  // Generate the page numbers
  for (let i = shortStartPage; i <= shortEndPage; i++) {
    if (i === 1 || i === totalPageCount) {
      continue;
    }
    shortPageNumbers.push(i);
  }

  // Add ellipsis if there are more pages
  if (shortStartPage >= 2) {
    shortPageNumbers.unshift('...');
  }
  if (shortEndPage <= totalPageCount - 1) {
    shortPageNumbers.push('...');
  }

  // Add the first and last page numbers
  shortPageNumbers.unshift(1);
  if (totalPageCount > 1) {
    shortPageNumbers.push(totalPageCount);
  }

  return { shortPageNumbers, longPageNumbers, totalPageCount };
};
