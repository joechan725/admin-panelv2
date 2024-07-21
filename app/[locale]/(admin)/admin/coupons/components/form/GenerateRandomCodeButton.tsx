import TextButton from '@/components/form/TextButton';
import { generateRandomCode } from '@/lib/helpers/string/generateRandomCode';
import { CouponSchema } from '@/schemas/couponSchema';
import { UseFormSetValue } from 'react-hook-form';

interface GenerateRandomCodeButtonProps {
  setValue: UseFormSetValue<CouponSchema>;
}

const GenerateRandomCodeButton = ({ setValue }: GenerateRandomCodeButtonProps) => {
  const handleGenerateRandomCode = () => {
    const randomCode = generateRandomCode(6, 'digit-letter', 'uppercase');
    setValue('code', randomCode);
  };

  return (
    <TextButton
      theme="safe"
      className="text-sm font-semibold"
      onClick={handleGenerateRandomCode}
      type="button"
      disabled={false}
    >
      RANDOM
    </TextButton>
  );
};

export default GenerateRandomCodeButton;
