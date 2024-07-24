import { convertToPastTimeDescription } from '@/lib/helpers/date/convertToPastTimeDescription';
import { formatAddress } from '@/lib/helpers/language/formatAddress';
import { getDistrict } from '@/lib/helpers/language/getDistrict';
import { getRegion } from '@/lib/helpers/language/getRegion';
import { getNotificationDetail } from '@/lib/helpers/notification/getNotificationDetail';
import { combineFNameAndLName } from '@/lib/helpers/string/combineFNameAndLName';
import { Notification } from '@/models/user/notification/Notification';
import { District } from '@/types/District';
import { Region } from '@/types/Region';
import { useLocale, useTranslations } from 'next-intl';

interface ConvertAddressParameters {
  region?: Region;
  district?: District;
  detailAddress?: string;
}

interface ConvertUserNameParameters {
  firstName?: string;
  lastName?: string;
  fallbackName?: string;
}

export const useLanguage = () => {
  const tAddress = useTranslations('Address');
  const tUser = useTranslations('User.general');
  const tNotification = useTranslations('Notification');
  const locale = useLocale();

  const convertRegion = (region: Region) => {
    return getRegion(region, tAddress);
  };

  const convertDistrict = (district: District) => {
    return getDistrict(district, tAddress);
  };

  const convertAddress = ({ region, district, detailAddress }: ConvertAddressParameters) => {
    return formatAddress({ locale, region, detailAddress, district, tAddress });
  };

  const convertUserName = ({ firstName, lastName, fallbackName }: ConvertUserNameParameters) => {
    return combineFNameAndLName({ firstName, lastName, fallbackName: fallbackName ?? tUser('fallbackName') });
  };

  const convertPastTimeDescription = (a: Date | string | number, b: Date | string | number) => {
    return convertToPastTimeDescription(a, b, tNotification);
  };

  const convertNotificationDetail = (notification: Notification) => {
    const { userFirstName, userLastName } = notification;
    const userFullName = convertUserName({ firstName: userFirstName, lastName: userLastName });

    return getNotificationDetail({ notification, userFullName, tNotification });
  };

  return {
    convertRegion,
    convertDistrict,
    convertAddress,
    convertUserName,
    convertPastTimeDescription,
    locale,
    convertNotificationDetail,
  };
};
