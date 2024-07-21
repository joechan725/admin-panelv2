import ChevronDoubleRight from '@/components/icon/ChevronDoubleRight';
import clsx from 'clsx/lite';
import { useTranslations } from 'next-intl';

interface StepperProps {
  step: 'placement' | 'payment' | 'confirmation';
}

const Stepper = ({ step }: StepperProps) => {
  const t = useTranslations('Order.checkoutStepper');

  return (
    <div className="grid grid-cols-5 my-10">
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="size-8 flex justify-center items-center rounded-full bg-primary-bg/85">
          <span className="text-sm md:text-base font-semibold text-white">1</span>
        </div>
        <div className="text-sm md:text-base font-semibold text-primary-text">{t('placement')}</div>
      </div>
      <div className="flex justify-center items-center">
        <div className={clsx(step === 'payment' || step === 'confirmation' ? 'text-slate-600' : 'text-slate-300')}>
          <ChevronDoubleRight sizeClassName="size-5 md:size-6" />
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <div
          className={clsx(
            'size-8 flex justify-center items-center rounded-full',
            step === 'payment' || step === 'confirmation' ? 'bg-primary-bg/85' : 'bg-primary-bg/40'
          )}
        >
          <span className="text-sm md:text-base font-semibold text-white">2</span>
        </div>
        <div className="text-sm md:text-base font-semibold text-primary-text">{t('payment')}</div>
      </div>
      <div className="flex justify-center items-center">
        <div className={clsx(step === 'confirmation' ? 'text-slate-600' : 'text-slate-300')}>
          <ChevronDoubleRight sizeClassName="size-5 md:size-6" />
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <div
          className={clsx(
            'size-8 flex justify-center items-center rounded-full',
            step === 'confirmation' ? 'bg-primary-bg/85' : 'bg-primary-bg/40'
          )}
        >
          <span className="text-sm md:text-base font-semibold text-white">3</span>
        </div>
        <div className="text-sm md:text-base font-semibold text-primary-text">{t('confirmation')}</div>
      </div>
    </div>
  );
};

export default Stepper;
