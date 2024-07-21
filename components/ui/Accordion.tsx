'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ChevronRight from '../icon/ChevronRight';
import clsx from 'clsx/lite';

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prevOpen) => !prevOpen);

  return (
    <div className="space-y-1 w-full">
      <div role="button" onClick={handleToggle}>
        <div className="flex gap-4 items-center">
          <div className="flex items-center justify-center">
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} className="flex-0">
              <ChevronRight className="text-black/80 font-black" sizeClassName="size-5" />
            </motion.div>
          </div>
          <div className="flex-1">{title}</div>
        </div>
      </div>
      <motion.div
        animate={{ height: isOpen ? 'auto' : 0 }}
        className={clsx('ml-9 overflow-hidden', isOpen ? 'h-full' : 'h-0')}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Accordion;
