export const sortObjectsByKey = <T extends object>(
  objects: T[],
  objectKey: keyof T,
  sortOrder: 'asc' | 'desc'
): T[] => {
  const sortedObjects = objects.sort((a, b) => {
    const valueA = a[objectKey];
    const valueB = b[objectKey];

    // Sort to back if values are undefined or null
    if (valueA === null || valueA === undefined) {
      return 1;
    }
    if (valueB === null || valueB === undefined) {
      return -1;
    }

    // Handle sorting based on data type
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      if (sortOrder === 'asc') {
        return valueA.localeCompare(valueB);
      }
      if (sortOrder === 'desc') {
        return valueB.localeCompare(valueA);
      }
      return 0;
    }
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      if (sortOrder === 'asc') {
        return valueA - valueB;
      }
      if (sortOrder === 'desc') {
        return valueB - valueA;
      }
      return 0;
    }
    if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
      if (sortOrder === 'asc') {
        return valueA === valueB ? 0 : valueA ? 1 : -1;
      }
      if (sortOrder === 'desc') {
        return valueA === valueB ? 0 : valueA ? -1 : 1;
      }
      return 0;
    }

    // If values are not comparable or are of mixed types
    const stringA = String(valueA);
    const stringB = String(valueB);
    return sortOrder === 'asc' ? stringA.localeCompare(stringB) : stringB.localeCompare(stringA);
  });

  return sortedObjects;
};
