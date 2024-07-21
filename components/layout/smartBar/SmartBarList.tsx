import { SmartBar } from '@/models/smartBar/SmartBar';
import SmartBarItem from './SmartBarItem';

interface SmartBarListProps {
  smartBars: SmartBar[];
}

const SmartBarList = ({ smartBars }: SmartBarListProps) => {
  return (
    smartBars &&
    smartBars.length > 0 &&
    smartBars.map((smartBar) => <SmartBarItem smartBar={smartBar} key={smartBar.id} />)
  );
};

export default SmartBarList;
