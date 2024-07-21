import { db } from '@/firebase/config';
import { Email } from '@/models/email/Email';
import { addDoc, collection } from 'firebase/firestore';

interface SendEmailParameters {
  email: Email;
}

// Docs
// https://extensions.dev/extensions/firebase/firestore-send-email
// https://firebase.google.com/docs/extensions/official/firestore-send-email

// Follow this tutorial to set up the email trigger extension in firebase
// https://www.youtube.com/watch?v=1nsnNLLnlrg

// Extra article on the email trigger extension
// https://invertase.io/blog/send-email-extension

// Add to emulators (blaze plan only)
// https://firebase.google.com/docs/emulator-suite/use_extensions

export const sendEmail = async ({ email }: SendEmailParameters) => {
  const mailsRef = collection(db, '/mail');

  const res = await addDoc(mailsRef, email);

  return res.id;
};
