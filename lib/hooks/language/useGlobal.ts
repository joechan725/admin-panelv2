import { locales } from '@/i18n/config';
import { usePathname, useRouter } from '@/navigation';

export const useGlobal = () => {
  const router = useRouter();
  const path = usePathname();

  const changeLanguage = (locale: (typeof locales)[number]) => {
    router.push(path, { locale });
  };

  return {
    changeLanguage,
  };
};
