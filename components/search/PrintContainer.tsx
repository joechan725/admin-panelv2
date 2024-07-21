'use client';

import BoxButton from '@/components/form/BoxButton';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import Printer from '../icon/Printer';
import { useTranslations } from 'next-intl';

interface PrintContainerProps {
  heading?: React.ReactNode;
  ending?: React.ReactNode;
  children: React.ReactNode;
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
}

const PrintContainer = ({ heading, ending, children, fontSize }: PrintContainerProps) => {
  const t = useTranslations('Print');

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  return (
    <div className="space-y-4" ref={printRef}>
      <div className="mt-4 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex-1">{heading}</div>
        <div className="flex-0">
          <BoxButton onClick={handlePrint} type="button" disabled={false} theme="gray-light" fontSize={fontSize}>
            <div className="flex items-center justify-center gap-2">
              <Printer sizeClassName="size-5" /> {t('print')}
            </div>
          </BoxButton>
        </div>
        {ending && <div className="flex-0">{ending}</div>}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default PrintContainer;
