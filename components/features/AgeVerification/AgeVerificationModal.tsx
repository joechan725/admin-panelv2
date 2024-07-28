'use client';

import BarButton from '@/components/form/BarButton';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { AgeVerification } from '@/models/ageVerification/AgeVerification';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface AgeVerificationModalProps {}

const AgeVerificationModal = ({}: AgeVerificationModalProps) => {
  const t = useTranslations('AgeVerification');

  const [isOver18, setIsOver18] = useState(false);

  const current = new Date().getTime();

  useEffect(() => {
    const ageVerificationString = localStorage.getItem('ageVerification');
    if (!ageVerificationString) {
      setIsOver18(false);
      return;
    }
    const { isOver18: isOver18Data, nextVerifyAt } = JSON.parse(ageVerificationString) as AgeVerification;
    if (current > nextVerifyAt) {
      setIsOver18(false);
      localStorage.removeItem('ageVerification');
      return;
    }
    setIsOver18(isOver18Data);
  }, []);

  if (isOver18) {
    return null;
  }

  const handleConfirm = () => {
    const ageVerification: AgeVerification = {
      isOver18: true,
      nextVerifyAt: current + 30 * 24 * 60 * 60 * 1000,
    };
    const ageVerificationString = JSON.stringify(ageVerification);
    localStorage.setItem('ageVerification', ageVerificationString);
    setIsOver18(true);
  };

  const handleDeny = () => {
    window.location.href = 'https://www.google.com/';
  };

  return (
    <AnimatePresence>
      {!isOver18 && (
        <PopUpModal
          backdrop
          onClose={() => {}}
          sizeClassName="max-w-screen-md w-full"
          className="p-8 md:p-16"
          blurBackdrop
          backdropAnimation={false}
          scrollbar
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="text-center text-xl font-semibold text-primary-text">{t('title')}</div>
              <div className="text-center font-medium text-secondary-text">{t('description')}</div>
            </div>
            <div className="flex gap-4">
              <BarButton disabled={false} theme="black" type="button" onClick={handleConfirm}>
                {t('confirm')}
              </BarButton>
              <BarButton disabled={false} theme="white" type="button" onClick={handleDeny}>
                {t('deny')}
              </BarButton>
            </div>
          </div>
        </PopUpModal>
      )}
    </AnimatePresence>
  );
};

export default AgeVerificationModal;
