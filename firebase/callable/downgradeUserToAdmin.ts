import { httpsCallable } from 'firebase/functions';
import { functions } from '../config';

interface Request {
  userId: string;
}

interface Response {
  success: boolean;
}

export const downgradeUserFromAdmin = httpsCallable<Request, Response>(functions, 'downgradeUserFromAdmin');
