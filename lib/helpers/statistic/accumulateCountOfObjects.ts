export const accumulateCountOfObjects = <T extends object, K extends keyof T, CountName extends string>(
  objects: T[],
  primaryField: K & T[K] extends string ? K : never,
  countName: CountName
): (T & { [k in CountName]: number })[] => {
  const accumulator: Record<string, T & { [Key in CountName]: number }> = {};

  // Create a reversed copy of the objects array to avoid side effects
  const reversedObjects = [...objects].reverse();

  reversedObjects.forEach((object) => {
    const primaryId = object[primaryField] as string;

    if (!accumulator[primaryId]) {
      accumulator[primaryId] = { ...object, [countName]: 0 } as T & { [Key in CountName]: number };
    }

    (accumulator[primaryId][countName] as number) += 1;
  });

  const accumulatorArray = Object.values(accumulator);

  return accumulatorArray;
};
