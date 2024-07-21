export const sliceObjectsByPage = <T extends object>(
  objects: T[],
  currentPage: number | null,
  itemsPerPage: number
): T[] => {
  if (!currentPage) {
    return objects;
  }

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return objects.slice(start, end);
};
