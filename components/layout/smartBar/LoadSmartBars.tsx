import { getSmartBarLists } from '@/firebase/api/smartBar/getSmartBarLists';
import SmartBarList from './SmartBarList';

interface LoadSmartBarsProps {}
const LoadSmartBars = async ({}: LoadSmartBarsProps) => {
  try {
    const smartBars = await getSmartBarLists();

    return <SmartBarList smartBars={smartBars} />;
  } catch (error) {
    return null;
  }
};
export default LoadSmartBars;
