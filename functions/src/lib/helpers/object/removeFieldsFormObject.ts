/**
 * Returns a new object with specified fields removed.
 *
 * @param object The original object from which fields will be removed.
 * @param fields An array of strings representing the field names to remove from the object.
 *
 * @returns a new object with specified fields removed
 */

export const removeFieldsFormObject = <T extends object, K extends keyof T>(object: T, fields: K[]): Omit<T, K> => {
  // Create a shallow copy of the object
  const newObject = { ...object };

  // Delete specified fields from the new object
  fields.forEach((field) => {
    delete newObject[field];
  });

  return newObject;
};
