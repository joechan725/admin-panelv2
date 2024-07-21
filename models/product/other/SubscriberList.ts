import { Subscriber } from '../../subscriber/Subscriber';

export interface SubscriberList {
  subscribers: Subscriber[];
  updatedAt: number;
}
