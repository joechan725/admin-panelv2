import { ExtendWithFieldValue } from '../../../types/ExtendWithFieldValue';
import { deleteField } from 'firebase/firestore';

/**
 * Returns a new object with the fields = deleteField() when it is undefined, null, or an empty string.
 *
 * @param object The original object to clean.
 * @returns a new object with the fields = deleteField() when it is undefined, null, or an empty string
 */

export const addDeleteFieldForEmptyFieldInObject = <T extends object>(object: T): ExtendWithFieldValue<T> => {
  const newObject = {} as ExtendWithFieldValue<T>;
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      if (value !== undefined && value !== null && value !== '') {
        newObject[key] = value;
        continue;
      }
      newObject[key] = deleteField();
    }
  }
  return newObject;
};
