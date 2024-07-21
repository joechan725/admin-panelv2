import { Suspense } from 'react';
import SelectSearch from './SelectSearch';

interface SelectSearchSuspenseProps {
  searchParamsKey: string;
  selectOptions: {
    option: string;
    searchParamsValue: string;
  }[];
  title?: string;
}

const SelectSearchSuspense = ({ searchParamsKey, selectOptions, title }: SelectSearchSuspenseProps) => {
  return (
    <Suspense>
      <SelectSearch searchParamsKey={searchParamsKey} selectOptions={selectOptions} title={title} />
    </Suspense>
  );
};

export default SelectSearchSuspense;
