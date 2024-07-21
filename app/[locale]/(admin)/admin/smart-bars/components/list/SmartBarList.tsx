import { SmartBar } from '@/models/smartBar/SmartBar';
import SmartBarItem from './SmartBarItem';
import { SmartBarIdAndIsPublic } from '@/lib/hooks/smartBar/useSmartBar';

interface SmartBarListProps {
  smartBars: SmartBar[];
  onSelect?: ({}: SmartBarIdAndIsPublic) => void;
  selectedSmartBars?: SmartBarIdAndIsPublic[];
}
const SmartBarList = ({ smartBars, onSelect, selectedSmartBars }: SmartBarListProps) => {
  return (
    smartBars &&
    smartBars.length > 0 &&
    smartBars.map((smartBar) => (
      <SmartBarItem
        key={smartBar.id}
        smartBar={smartBar}
        onSelect={onSelect}
        isSelect={selectedSmartBars && selectedSmartBars.some((object) => object.smartBarId === smartBar.id)}
      />
    ))
  );
};
export default SmartBarList;
