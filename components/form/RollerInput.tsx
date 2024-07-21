'use client';

import HoverPopup from '../ui/popup/HoverPopup';

interface RollerInputProps {
  title?: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  highestValue: number;
  lowestValue: number;
}

const RollerInput = ({ title, value, setValue, highestValue, lowestValue }: RollerInputProps) => {
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +event.target.value;
    if (newValue > highestValue || newValue < lowestValue) {
      return;
    }
    setValue(newValue);
  };

  return (
    <div className="space-y-2">
      {title !== undefined && <div className="text-sm font-semibold text-primary-text">{title}</div>}
      <HoverPopup message={value} algin="right">
        <div className="w-full relative h-4">
          <div className="w-full absolute z-10 top-1/2 -translate-y-1/2 flex">
            <div className="w-full h-0.5 bg-primary-bg/60 rounded-full" />
          </div>
          <input
            name="value"
            min={lowestValue}
            max={highestValue}
            type="range"
            onChange={handleValueChange}
            value={value}
            className="absolute w-full range-input overflow-hidden rounded-full h-4 bg-transparent focus:outline-none"
          />
        </div>
      </HoverPopup>
      <div className="flex justify-between">
        <div className="text-sm font-medium text-secondary-text">{lowestValue}</div>
        <div className="text-sm font-medium text-secondary-text">{highestValue}</div>
      </div>
    </div>
  );
};

export default RollerInput;
