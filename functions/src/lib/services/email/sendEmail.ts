import * as admin from 'firebase-admin';
import { Email } from '../../../models/email/Email';

const db = admin.firestore();

interface SendEmailParameters {
  email: Email;
}

// Docs
// https://extensions.dev/extensions/firebase/firestore-send-email
// https://firebase.google.com/docs/extensions/official/firestore-send-email

// Follow this video tutorial to set up the email trigger extension in firebase
// https://www.youtube.com/watch?v=1nsnNLLnlrg

// Extra article on the email trigger extension
// https://invertase.io/blog/send-email-extension

// Add to emulators (blaze plan only)
// https://firebase.google.com/docs/emulator-suite/use_extensions

export const sendEmail = async ({ email }: SendEmailParameters) => {
  await db.collection('mail').add(email);
};
