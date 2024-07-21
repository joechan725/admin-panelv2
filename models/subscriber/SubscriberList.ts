import { Subscriber } from './Subscriber';

export interface SubscriberList {
  subscribers: Subscriber[];
  updatedAt: number;
}
