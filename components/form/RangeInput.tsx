'use client';

import Minus from '@/components/icon/Minus';
import { useTranslations } from 'next-intl';

interface RangeInputProps {
  minValue?: number;
  setMinValue: React.Dispatch<React.SetStateAction<number | undefined>>;
  maxValue?: number;
  setMaxValue: React.Dispatch<React.SetStateAction<number | undefined>>;
  highestValue: number;
  lowestValue: number;
}

const RangeInput = ({ maxValue, minValue, setMaxValue, setMinValue, highestValue, lowestValue }: RangeInputProps) => {
  const t = useTranslations('Product.filter');

  const handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = +event.target.value;
    if ((minValue !== undefined && newMaxValue < minValue) || newMaxValue > highestValue) {
      return;
    }
    setMaxValue(newMaxValue);
  };

  const handleMinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinValue = +event.target.value;
    if ((maxValue !== undefined && newMinValue > maxValue) || newMinValue < lowestValue) {
      return;
    }
    setMinValue(newMinValue);
  };

  const firstDivWidth = `${((minValue ?? lowestValue) / highestValue) * 100}%`;
  const secondDivWidth = `${(((maxValue ?? highestValue) - (minValue ?? lowestValue)) / highestValue) * 100}%`;
  const thirdDivWidth = `${((highestValue - (maxValue ?? highestValue)) / highestValue) * 100}%`;

  return (
    <div className="space-y-2">
      <div className="w-full relative h-4">
        <div className="w-full absolute z-10 top-1/2 -translate-y-1/2 flex">
          <div className="w-full h-0.5 bg-primary-bg/20 rounded-full" style={{ width: firstDivWidth }} />
          <div className="w-full h-0.5 bg-primary-bg/60 rounded-full" style={{ width: secondDivWidth }} />
          <div className="w-full h-0.5 bg-primary-bg/20 rounded-full" style={{ width: thirdDivWidth }} />
        </div>
        <input
          name="max"
          min={lowestValue}
          max={highestValue}
          type="range"
          onChange={handleMaxValueChange}
          value={maxValue ?? highestValue}
          className="absolute w-full range-input overflow-hidden rounded-full h-4 bg-transparent focus:outline-none"
        />
        <input
          name="min"
          min={lowestValue}
          max={highestValue}
          type="range"
          onChange={handleMinValueChange}
          value={minValue ?? lowestValue}
          className="absolute w-full range-input overflow-hidden rounded-full h-4 bg-transparent focus:outline-none"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="border rounded border-black/30 has-[:focus]:border-black/80 px-2 py-1 w-5/12 overflow-hidden">
          <div className="text-xs font-medium text-secondary-text">{t('min')}</div>
          <div className="flex items-center gap-2">
            <div className="font-medium">$</div>
            <input
              type="number"
              value={minValue ?? lowestValue}
              onChange={handleMinValueChange}
              className="outline-none font-medium number-input-no-scroll"
            />
          </div>
        </div>
        <div>
          <Minus className="text-primary-bg/50" />
        </div>
        <div className="border rounded border-black/30 has-[:focus]:border-black/80 px-2 py-1 w-5/12 overflow-hidden">
          <div className="text-xs font-medium text-secondary-text">{t('max')}</div>
          <div className="flex items-center gap-2">
            <div className="font-medium">$</div>
            <input
              type="number"
              value={maxValue ?? highestValue}
              onChange={handleMaxValueChange}
              className="outline-none font-medium number-input-no-scroll"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeInput;
