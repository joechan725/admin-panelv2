import BuildingOffice2 from '@/components/icon/BuildingOffice2';
import Email from '@/components/icon/Email';
import { NavLink } from '@/models/navLink/NavLink';
import { TranslationFunction } from '@/types/TranslationFunction';

export const getSettingNavItems = (tSetting: TranslationFunction): NavLink[] => [
  {
    href: '/admin/settings/store-addresses',
    icon: <BuildingOffice2 sizeClassName="size-4" />,
    title: tSetting('storeAddresses'),
  },
  {
    href: '/admin/settings/contact-us',
    icon: <Email sizeClassName="size-4" />,
    title: tSetting('contactUs'),
  },
];
