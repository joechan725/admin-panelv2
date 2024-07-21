import { District } from '@/types/District';
import { Region } from '@/types/Region';
import { TranslationFunction } from '@/types/TranslationFunction';
import { getRegion } from './getRegion';
import { getDistrict } from './getDistrict';

interface FormatAddressParameters {
  district?: District;
  region?: Region;
  detailAddress?: string;
  locale: string;
  tAddress: TranslationFunction;
}

export const formatAddress = ({
  locale,
  detailAddress,
  region,
  district,
  tAddress,
}: FormatAddressParameters): string => {
  const localizedRegion = getRegion(region, tAddress);
  const localizedDistrict = getDistrict(district, tAddress);

  if (locale === 'en') {
    return `${detailAddress}, ${localizedDistrict}, ${localizedRegion}`;
  }

  return `${localizedRegion}${localizedDistrict}${detailAddress}`;
};
