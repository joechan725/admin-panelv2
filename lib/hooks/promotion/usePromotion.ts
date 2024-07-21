import { addPromotion, AddPromotionFirestoreData } from '@/firebase/api/promotion/addPromotion';
import { getPromotion } from '@/firebase/api/promotion/getPromotion';
import { applyBlockNoteHtmlStyles } from '@/lib/helpers/html/applyBlockNoteHtmlStyles';
import { getHtmlTemplate } from '@/lib/helpers/html/getHtmlTemplate';
import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { Promotion } from '@/models/promotion/Promotion';
import { PromotionSchema } from '@/schemas/promotionSchema';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useToast } from '../toast/useToast';

interface CreatePromotionParameters {
  formData: PromotionSchema;
  emailId?: string;
  notificationId?: string;
  bcc?: string[];
}

export const usePromotion = () => {
  const [promotion, setPromotion] = useState<Promotion | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { toastError } = useToast();

  const loadPromotion = async (promotionId: string) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const promotionData = await getPromotion(promotionId);
      setPromotion(promotionData);
    } catch (error) {
      setError('unexpectedError');
    } finally {
      setIsLoading(false);
    }
  };

  const createPromotion = async ({ formData, emailId, notificationId, bcc }: CreatePromotionParameters) => {
    setIsWriting(true);
    setError(undefined);
    try {
      const { htmlContent, promoteByEmail, promoteByNotification, subject } = formData;
      const styledHtml = applyBlockNoteHtmlStyles(htmlContent);
      const html = getHtmlTemplate('email', { mainContent: styledHtml });
      const promotionData: AddPromotionFirestoreData = removeEmptyFieldFormObject({
        promoteByEmail,
        promoteByNotification,
        emailId,
        notificationId,
        bcc,
        subject,
        html,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      await addPromotion(promotionData);
      return true;
    } catch (error) {
      setError('unexpectedError');
      toastError('unexpectedError');
      return false;
    } finally {
      setIsWriting(false);
    }
  };

  return { loadPromotion, createPromotion, promotion, isLoading, isWriting, error };
};
