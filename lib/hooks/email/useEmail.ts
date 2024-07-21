import { sendEmail } from '@/firebase/api/email/sendEmail';
import { getUserLists } from '@/firebase/api/user/getUserLists';
import { applyBlockNoteHtmlStyles } from '@/lib/helpers/html/applyBlockNoteHtmlStyles';
import { getHtmlTemplate } from '@/lib/helpers/html/getHtmlTemplate';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { Email } from '@/models/email/Email';
import { PromotionSchema } from '@/schemas/promotionSchema';
import { useState } from 'react';
import { useToast } from '../toast/useToast';

interface HandleSendEmailParameters {
  formData: PromotionSchema;
}

export const useEmail = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { toastError } = useToast();

  const handleSendEmail = async ({ formData }: HandleSendEmailParameters) => {
    setIsWriting(true);
    setError(undefined);
    const { additionalBcc, htmlContent, subject, toSubscribers } = formData;
    try {
      let bcc = [...additionalBcc];
      if (toSubscribers) {
        const users = await getUserLists();
        const subscribers = users.filter((user) => user.subscribeToPromotion);
        const subscriberEmails = subscribers.map((user) => user.email).filter((email) => email !== undefined);
        if (subscriberEmails && subscriberEmails.length > 0) {
          bcc = [...bcc, ...subscriberEmails];
        } else {
          if (additionalBcc.length === 0) {
            setError('The subscriber list is currently empty.');
            toastError('The subscriber list is currently empty.');
            return { success: false };
          }
        }
      }
      const styledHtml = applyBlockNoteHtmlStyles(htmlContent);
      const html = getHtmlTemplate('email', { mainContent: styledHtml });
      const email: Email = removeEmptyFieldFormObject({
        to: [],
        bcc,
        message: removeEmptyFieldFormObject({
          subject,
          html,
        }),
      });
      // Send the email
      const emailId = await sendEmail({ email });
      return { success: true, emailId, bcc };
    } catch (error) {
      setError('unexpectedError');
      toastError('unexpectedError');
      return { success: false };
    } finally {
      setIsWriting(false);
    }
  };

  return {
    handleSendEmail,
    isWriting,
    error,
  };
};
