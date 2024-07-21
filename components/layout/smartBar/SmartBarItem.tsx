import { SmartBar as SmartBarModel } from '@/models/smartBar/SmartBar';
import SmartBarContainer from './SmartBarContainer';
import SmartBar from './SmartBar';

interface SmartBarItemProps {
  smartBar: SmartBarModel;
}
const SmartBarItem = ({ smartBar }: SmartBarItemProps) => {
  return (
    <SmartBarContainer>
      <SmartBar smartBar={smartBar} />
    </SmartBarContainer>
  );
};
export default SmartBarItem;
