import { Region } from '@/types/Region';
import { TranslationFunction } from '@/types/TranslationFunction';

export const getRegion = (region: Region | undefined, tAddress: TranslationFunction) => {
  switch (region) {
    case 'Hong Kong Island':
      return tAddress('region.hongKongIsland');
    case 'Kowloon':
      return tAddress('region.kowloon');
    case 'New Territories':
      return tAddress('region.newTerritories');
    default:
      return region;
  }
};
