type ReplacedObject<T extends object, OldKey extends keyof T, NewKey extends string> = Omit<T, OldKey> & {
  [K in NewKey]: T[OldKey];
};

export const replaceKeyInObjects = <T extends object, OldKey extends keyof T, NewKey extends string>(
  objects: T[],
  oldKey: OldKey,
  newKey: NewKey
): ReplacedObject<T, OldKey, NewKey>[] => {
  const newObjects = objects.map((object) => {
    const { [oldKey]: oldKeyValue, ...rest } = object;
    return {
      ...rest,
      [newKey]: oldKeyValue,
    } as ReplacedObject<T, OldKey, NewKey>;
  });

  return newObjects;
};
