import { getStoreInformation } from '@/firebase/api/storeInformation/getStoreInformation';
import StoreInformation from './StoreInformation';

interface LoadStoreInformationProps {}

const LoadStoreInformation = async ({}: LoadStoreInformationProps) => {
  try {
    const storeInformation = await getStoreInformation();
    return <StoreInformation storeInformation={storeInformation} />;
  } catch (error) {
    return null;
  }
};

export default LoadStoreInformation;
