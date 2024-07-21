/**
 * Returns a new object with all fields that are undefined, null, or an empty string removed.
 *
 * @param object The original object to clean.
 * @returns a new object with all fields that are undefined, null, or an empty string removed.
 */

export const removeEmptyFieldFormObject = <T extends object>(object: T): T => {
  const newObject = {} as T;
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      if (value !== undefined && value !== null && value !== '') {
        newObject[key] = value;
      }
    }
  }
  return newObject;
};
