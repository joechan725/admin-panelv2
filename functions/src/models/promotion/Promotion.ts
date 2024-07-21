export interface Promotion {
  // ids
  id: string;
  emailId?: string;
  notificationId?: string;

  // general
  promoteByEmail: boolean;
  promoteByNotification: boolean;

  // email receivers
  to?: string[];
  cc?: string[];
  bcc?: string[];

  // content
  subject: string;
  text?: string;
  html?: string;

  // timestamp
  createdAt: number;
  updatedAt: number;
}
