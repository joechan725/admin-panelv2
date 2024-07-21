'use client';

import Language from '@/components/icon/Language';
import IconButton from '@/components/ui/button/IconButton';
import DropDown from '@/components/ui/popup/DropDown';
import { useState } from 'react';
import LanguageSelect from './LanguageSelect';

interface ChangeLanguageButtonProps {}

const ChangeLanguageButton = ({}: ChangeLanguageButtonProps) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <IconButton theme="secondary" onClick={() => setIsShow(true)} type="button" disabled={false}>
        <Language sizeClassName="size-6" />
      </IconButton>
      {isShow && (
        <DropDown
          closeButton
          sizeClassName="max-w-full sm:max-w-60 w-full"
          onClose={() => setIsShow(false)}
          roundedClassName="rounded-md"
          positionClassName="-bottom-2 right-0"
          scroll={false}
        >
          <LanguageSelect />
        </DropDown>
      )}
    </>
  );
};

export default ChangeLanguageButton;
