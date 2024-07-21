'use client';

import BoxButton from '@/components/form/BoxButton';
import UserIcon from '@/components/icon/User';
import IconButton from '@/components/ui/button/IconButton';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import PopUpModal from '@/components/ui/popup/PopUpModal';
import { combineFNameAndLName } from '@/lib/helpers/string/combineFNameAndLName';
import { useLanguage } from '@/lib/hooks/language/useLanguage';
import { useAdminUser } from '@/lib/hooks/user/admin/useAdminUser';
import { User } from '@/models/user/User';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface DowngradeUserToAdminButtonProps {
  user: User;
}

const DowngradeUserToAdminButton = ({ user }: DowngradeUserToAdminButtonProps) => {
  const t = useTranslations('User.list');
  const { convertUserName } = useLanguage();

  const { id, firstName, lastName } = user;

  const [isUpgrading, setIsUpgrading] = useState(false);

  const { runDowngradeUserFromAdmin, isWriting } = useAdminUser();

  const handleDowngradeUser = async () => {
    const res = await runDowngradeUserFromAdmin(id);
    if (res) {
      setIsUpgrading(false);
    }
  };

  return (
    <>
      <HoverPopup message={t('downgradeUserFromAdmin')}>
        <IconButton theme="danger" onClick={() => setIsUpgrading(true)} disabled={isWriting} type="button">
          <UserIcon sizeClassName="size-5" />
        </IconButton>
      </HoverPopup>
      <AnimatePresence>
        {isUpgrading && (
          <PopUpModal
            scrollbar
            backdrop
            onClose={() => setIsUpgrading(false)}
            closeButton
            className="p-16"
            sizeClassName="max-w-md"
          >
            <div className="space-y-1">
              <div className="font-semibold text-primary-text">{t('confirmDowngrade')}</div>
              <div>
                <span className="font-semibold text-primary-text">{t('userName')}</span>
                <span className="font-medium text-secondary-text">{convertUserName({ firstName, lastName })}</span>
              </div>
              <div className="text-danger font-bold">{t('caution')}</div>
            </div>
            <div className="ml-auto max-w-min mt-4">
              <BoxButton onClick={handleDowngradeUser} type="button" disabled={isWriting} theme="danger" fontSize="sm">
                {t('confirm')}
              </BoxButton>
            </div>
          </PopUpModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default DowngradeUserToAdminButton;
