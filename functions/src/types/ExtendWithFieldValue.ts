import { FieldValue } from 'firebase/firestore';

export type ExtendWithFieldValue<T> = {
  [P in keyof T]: T[P] | FieldValue;
};
