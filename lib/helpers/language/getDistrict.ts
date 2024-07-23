import { District } from '@/types/District';
import { TranslationFunction } from '@/types/TranslationFunction';

export const getDistrict = (district: District | undefined, tDistrict: TranslationFunction) => {
  switch (district) {
    case 'Central and Western District':
      return tDistrict('district.centralAndWesternDistrict');
    case 'Eastern District':
      return tDistrict('district.easternDistrict');
    case 'Islands District':
      return tDistrict('district.islandsDistrict');
    case 'Kowloon City District':
      return tDistrict('district.kowloonCityDistrict');
    case 'Kwai Tsing District':
      return tDistrict('district.kwaiTsingDistrict');
    case 'Kwun Tong District':
      return tDistrict('district.kwunTongDistrict');
    case 'North District':
      return tDistrict('district.northDistrict');
    case 'Sai Kung District':
      return tDistrict('district.saiKungDistrict');
    case 'Sha Tin District':
      return tDistrict('district.shaTinDistrict');
    case 'Sham Shui Po District':
      return tDistrict('district.shamShuiPoDistrict');
    case 'Southern District':
      return tDistrict('district.southernDistrict');
    case 'Tai Po District':
      return tDistrict('district.taiPoDistrict');
    case 'Tsuen Wan District':
      return tDistrict('district.tsuenWanDistrict');
    case 'Tuen Mun District':
      return tDistrict('district.tuenMunDistrict');
    case 'Wan Chai District':
      return tDistrict('district.wanChaiDistrict');
    case 'Wong Tai Sin District':
      return tDistrict('district.wongTaiSinDistrict');
    case 'Yau Tsim Mong District':
      return tDistrict('district.yauTsimMongDistrict');
    case 'Yuen Long District':
      return tDistrict('district.yuenLongDistrict');
    default:
      return district;
  }
};
