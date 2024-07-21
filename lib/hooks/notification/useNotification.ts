import { addNotification, AddNotificationFirestoreData } from '@/firebase/api/notification/addNotification';
import { addInlineBlockToParagraphs } from '@/lib/helpers/html/addInlineBlockToParagraphs';
import { applyBlockNoteHtmlStyles } from '@/lib/helpers/html/applyBlockNoteHtmlStyles';
import { convertHeadingsToParagraphs } from '@/lib/helpers/html/convertHeadingsToParagraphs';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { PromotionSchema } from '@/schemas/promotionSchema';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useToast } from '../toast/useToast';

interface CreateGlobalNotificationParameters {
  formData: PromotionSchema;
}

export const useNotification = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { toastError } = useToast();

  const createGlobalNotification = async ({ formData }: CreateGlobalNotificationParameters) => {
    setIsWriting(true);
    setError(undefined);
    try {
      const { subject, htmlContent, promoteByNotification } = formData;
      if (!promoteByNotification) {
        return { success: true };
      }
      const convertedHtml = convertHeadingsToParagraphs(htmlContent);
      const inlineHtml = addInlineBlockToParagraphs(convertedHtml);
      const styledHtml = applyBlockNoteHtmlStyles(inlineHtml);
      const notificationData: AddNotificationFirestoreData = removeEmptyFieldFormObject({
        category: 'Promotion',
        type: 'Promotion',
        subject,
        html: styledHtml,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      const notificationId = await addNotification(notificationData);
      return { success: true, notificationId };
    } catch (error) {
      setError('unexpectedError');
      toastError('unexpectedError');
      return { success: false };
    } finally {
      setIsWriting(false);
    }
  };

  return { createGlobalNotification, isWriting, error };
};
