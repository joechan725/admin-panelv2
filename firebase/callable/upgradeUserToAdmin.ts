import { httpsCallable } from 'firebase/functions';
import { functions } from '../config';

interface Request {
  userId: string;
}

interface Response {
  success: boolean;
}

export const upgradeUserToAdmin = httpsCallable<Request, Response>(functions, 'upgradeUserToAdmin');
