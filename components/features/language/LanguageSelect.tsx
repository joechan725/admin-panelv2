import { useGlobal } from '@/lib/hooks/language/useGlobal';
import { useTranslations } from 'next-intl';

interface LanguageSelectProps {}

const LanguageSelect = ({}: LanguageSelectProps) => {
  const t = useTranslations('Language');
  const { changeLanguage } = useGlobal();

  return (
    <div className="divide-y divide-slate-600/20">
      <div className="w-full p-4">
        <div className="text-sm font-semibold text-secondary-text text-center">{t('selectLanguage')}</div>
      </div>
      <button className="w-full p-4 hover:bg-gray-400/10 active:bg-gray-400/20" onClick={() => changeLanguage('zh')}>
        <div className="text-sm font-semibold text-secondary-text text-center">{t('zh')}</div>
      </button>
      <button className="w-full p-4 hover:bg-gray-400/10 active:bg-gray-400/20" onClick={() => changeLanguage('en')}>
        <div className="text-sm font-semibold text-secondary-text text-center">{t('en')}</div>
      </button>
    </div>
  );
};

export default LanguageSelect;
