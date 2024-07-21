export const checkFieldsEqual = <T extends Object>(obj1: T | undefined, obj2: T | undefined, fields: (keyof T)[]) => {
  if (!obj1 || !obj2) {
    return false;
  }

  for (const field of fields) {
    if (obj1[field] !== obj2[field]) {
      return false;
    }
  }
  return true;
};
