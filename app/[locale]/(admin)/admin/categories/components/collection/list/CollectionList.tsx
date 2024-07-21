import CollectionItem from './CollectionItem';
import { PrivateCollection } from '@/models/classification/collection/PrivateCollection';

interface CollectionListProps {
  collections?: PrivateCollection[];
  onSelect?: (id: string) => void;
  selectedCollectionIds?: string[];
}

const CollectionList = ({ collections, onSelect, selectedCollectionIds }: CollectionListProps) => {
  return (
    collections &&
    collections.length > 0 &&
    collections.map((collection) => (
      <CollectionItem
        key={collection.id}
        privateCollection={collection}
        onSelect={onSelect}
        isSelect={selectedCollectionIds && selectedCollectionIds.includes(collection.id)}
      />
    ))
  );
};

export default CollectionList;
