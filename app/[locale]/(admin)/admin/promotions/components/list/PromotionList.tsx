import { Promotion } from '@/models/promotion/Promotion';
import PromotionItem from './PromotionItem';

interface PromotionListProps {
  promotions: Promotion[];
}

const PromotionList = ({ promotions }: PromotionListProps) => {
  return (
    promotions &&
    promotions.length > 0 &&
    promotions.map((promotion) => <PromotionItem key={promotion.id} promotion={promotion} />)
  );
};

export default PromotionList;
