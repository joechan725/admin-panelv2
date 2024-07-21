import SelectSearchSuspense from './SelectSearchSuspense';

interface ItemsPerPageSelectorProps {
  searchParamsKey?: string;
}

const ItemsPerPageSelector = ({ searchParamsKey = 'limit' }: ItemsPerPageSelectorProps) => {
  return (
    <SelectSearchSuspense
      searchParamsKey={searchParamsKey}
      selectOptions={[
        { option: '10', searchParamsValue: '10' },
        { option: '20', searchParamsValue: '20' },
        { option: '50', searchParamsValue: '50' },
      ]}
    />
  );
};

export default ItemsPerPageSelector;
