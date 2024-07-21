interface searchObjectsAllKeysParameters<T> {
  objects: T[];
  searchQuery: string | undefined | null;
}

export const searchObjectsAllKeys = <T extends object>(
  objects: T[],
  searchQuery: string | string[] | undefined | null
): T[] => {
  if (!searchQuery) {
    return objects;
  }

  // Convert the search query to lower case
  const queries = Array.isArray(searchQuery)
    ? searchQuery.map((query) => query.toLowerCase())
    : [searchQuery.toLowerCase()];

  // Filter the objects based on the search query
  const filteredObjects = objects.filter((object) => {
    // Iterate through each key in the object
    for (const key of Object.keys(object) as (keyof T)[]) {
      // Get the field value of the current key
      const value = object[key];

      // Check if any of the queries match the field value
      for (const query of queries) {
        // If the field value is a string and contains the query, return true
        if (typeof value === 'string' && value.toLowerCase().includes(query)) {
          return true;
        }

        // If the field value is an array of strings, check each string
        if (Array.isArray(value)) {
          for (const item of value) {
            if (typeof item === 'string' && item.toLowerCase().includes(query)) {
              return true;
            }
          }
        }
      }
    }
    // Return false if none of the fields match the search query
    return false;
  });

  return filteredObjects;
};
