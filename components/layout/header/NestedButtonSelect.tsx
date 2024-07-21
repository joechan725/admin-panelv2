'use client';

import { useTranslations } from 'next-intl';

interface NestedButtonSelectProps {
  setSelect: React.Dispatch<React.SetStateAction<'wishlist' | 'language' | undefined>>;
}

const NestedButtonSelect = ({ setSelect }: NestedButtonSelectProps) => {
  const t = useTranslations('Header');

  return (
    <div className="divide-y divide-slate-600/20">
      <button className="w-full p-4 hover:bg-gray-400/10 active:bg-gray-400/20" onClick={() => setSelect('wishlist')}>
        <div className="text-sm font-semibold text-secondary-text text-center">{t('wishlist')}</div>
      </button>
      <button className="w-full p-4 hover:bg-gray-400/10 active:bg-gray-400/20" onClick={() => setSelect('language')}>
        <div className="text-sm font-semibold text-secondary-text text-center">{t('selectLanguage')}</div>
      </button>
    </div>
  );
};

export default NestedButtonSelect;
