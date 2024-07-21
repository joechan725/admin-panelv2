export const accumulateFieldOfObjects = <T extends object, K extends keyof T, P extends keyof T>(
  objects: T[],
  primaryField: K & T[K] extends string ? K : never,
  fieldsToAccumulate: P[] & T[P] extends number ? P[] : never
) => {
  const accumulator: Record<string, T> = {};

  // Create a reversed copy of the objects array to avoid side effects
  const reversedObjects = [...objects].reverse();

  reversedObjects.forEach((object) => {
    const primaryId = object[primaryField] as string;

    if (!accumulator[primaryId]) {
      accumulator[primaryId] = { ...object };
      fieldsToAccumulate.forEach((field) => {
        accumulator[primaryId][field] = 0 as T[P];
      });
    }

    fieldsToAccumulate.forEach((field) => {
      if (typeof accumulator[primaryId][field] === 'number' && typeof object[field] === 'number') {
        accumulator[primaryId][field] = ((accumulator[primaryId][field] as unknown as number) +
          (object[field] as unknown as number)) as unknown as T[P];
      }
    });
  });

  const accumulatorArray = Object.values(accumulator);

  return accumulatorArray;
};
